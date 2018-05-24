var express = require('express');
var app = express();
var now = require("performance-now");
var shell = require('shelljs');
var exec = require('child_process').exec;
var EventEmitter = require('events').EventEmitter;
const fs = require('fs');
var request = require('request');
var bodyParser = require("body-parser");


var port = 8800; // port du serveur
var host = 'localhost'; // adresse du serveur

const pathMCR = '/usr/local/MATLAB/MATLAB_Compiler_Runtime/v81/'; // chemin librairie mathlab

// Configuration HTTP
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');
  res.append('Access-Control-Allow-Origin', ['*']);
  next();
});

app.use(bodyParser.json({limit: '50mb'})); // Transforme les req reçus en format json accessible depuis req.body

var tmpFileNumber = 0; // numero du fichier temporaire dans lequel on ecrit la matrice

// Inverser matrice ( version transit des données via fichier )
app.post('/matrice_fichier/id/:id/langage/:langage', function (req, res) {

  var matriceIsGood = new EventEmitter(); // Permet d'indiquer quand la matrice a finit d'être inversée
  var resultat = []; // [[matrice inversée], temps inversion]

  var nombreElementsMatrice = req.body.matrice.length;

  var tailleMatrice = Math.sqrt(nombreElementsMatrice);

  tailleMatrice = Math.trunc(tailleMatrice);

  var matrice = [];

  for (var i = 0; i < nombreElementsMatrice; i++) {
    matrice.push(req.body.matrice[i]);
  }

  // La variable resultat est renvoyé une fois l'inversion terminéé
  matriceIsGood.on('matriceGood', function (message, resultatFinal) {
    res.end(JSON.stringify(resultatFinal));
  });

  // Remplissage du fichier
  var outFileName = tmpFileNumber + "_matrice.txt";
  tmpFileNumber = tmpFileNumber + 1; // On incremente tmpFileNumber pour eviter d'avoir de fichier de même nom au même moment
  var outfile = fs.openSync(outFileName, 'w');
  var tmp = "";
  for (var j = 0; j < nombreElementsMatrice; j++) {
    tmp = "" + matrice[j];
    fs.writeSync(outfile, tmp + "\n", null, 'utf-8');
  }

  // inversion de la matrice en fonction du langage
  switch (req.params.langage) {

    case "java":

      var argsTailleJava = nombreElementsMatrice;

      var cmd = 'java InversionJavaFichier ' + outFileName + ' ' + argsTailleJava;

    break;

  case "python":

    var cmd = 'python InversionPythonFichier.py ' + tailleMatrice + ' ' + outFileName;
    break;

  case "r":

    var cmd = 'Rscript InversionRFichier.R ' + tailleMatrice + ' ' + outFileName;

    break;

  case "mathlab":

    var cmd = './run_inversion_v1.sh ' +  pathMCR + ' ' + tailleMatrice + ' ' + outFileName;

    break;

  default:
    break;

  }

  var tDebut = now();

  // Execution du script
  exec(cmd, function (error, stdout, stderr) {

    retour = stdout;

    var matriceInverse;

    if(req.params.langage == "java"){
      matriceInverse = retour.split(" ");
    }
    else if(req.params.langage == "python"){
      matriceInverse = retour.split("\n");
    }
    else if(req.params.langage == "mathlab"){
      matriceInverse = retour.split("\n");
    }
    else if(req.params.langage == "r"){
      matriceInverse = retour.split("[1] ");
    }

    resultat.push(matriceInverse);

    console.log("Resultat inversion matrice : " + matriceInverse);

    cmd = 'rm ' + outFileName;

    exec(cmd, function (error, stdout, stderr) {}); // suppression du fichier contenant la matrice

    var tFin = now(tDebut);

    var dureeScript = (tFin - tDebut) * 0.001;

    resultat.push(dureeScript);

    console.log("Temps script: " + dureeScript);

    // signal que le script a terminé
    matriceIsGood.emit('matriceGood', 'done', JSON.stringify(resultat));
  });

});

// Lancement de l'écoute de l'application
app.listen(port, host);
