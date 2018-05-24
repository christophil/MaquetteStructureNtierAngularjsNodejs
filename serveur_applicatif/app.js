var express = require('express');
var app = express();
var now = require("performance-now");
var shell = require('shelljs');
var exec = require('child_process').exec;
const pg = require('pg');
var EventEmitter = require('events').EventEmitter;
const fs = require('fs');
var mysql = require('mysql');
var request = require('request');


var port = 8500; // port du serveur
var host = 'localhost';
var serveur_algorithmes = 'http://localhost:8800'; // adresse serveur en local


const db = new pg.Client({
  user: '',
  host: '',
  database: '',
  password: '',
  port: 5432
});

db.connect((err) => {
  if (!err) {
    console.log("Postgres Connected");
  } else {
    console.log("Postgres Not Connected");
    console.log(err);
  }
});

//  Connexion MySQL

var db_mysql = mysql.createConnection({
  host: '',
  port: '',
  user: '',
  password: '',
  database: ''
});

db_mysql.connect(function (err) {

  if (!err) {
    console.log("MySQL Connected");
  } else {
    console.log("MySQL Not Connected");
    console.log(err);
  }
});

// Configuration HTTP
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');
  res.append('Access-Control-Allow-Origin', ['*']);
  next();
});

// Récupérer tous les relevés ( PG )
app.get('/relevemeteo/', function (req, res) {

  var tDebut = now(); // debut timer ( temps recupération BDD )

  db.query('SELECT * FROM relevemeteo LIMIT 52560', (err, result) => {

    if (!err) {

      var tFin = now(tDebut); // fin timer

      var dureeRequete = (tFin - tDebut) * 0.001;

      console.log("Temps récupération BDD tout ( secondes ): " + dureeRequete);

      // Envoie données en format JSON
      var donnees = result.rows;
      donnees.push(JSON.stringify(dureeRequete));
      console.log(donnees);
      res.end(JSON.stringify(donnees));

    } else {
      console.log("Erreur requete");
    };
  });
});

// Récupérer tous les relevés de la base MYSQL
app.get('/mysql/', function (req, res) {

  var tDebut = now(); // debut timer ( temps recupération BDD )

  db_mysql.query('', (err, result, fields) => {

    if (!err) {

      var tFin = now(tDebut); // fin timer

      var dureeRequete = (tFin - tDebut) * 0.001;

      console.log("Temps récupération BDD MYSQL tout ( secondes ): " + dureeRequete);

      var donnees = result;

      donnees.push(dureeRequete);

      res.end(JSON.stringify(donnees));
    } else {
      console.log("Erreur requete");
    };
  });
});


// Récupérer les relevés d'une certaine date ( PG )
app.get('/relevemeteo/date/:date', function (req, res) {

  var tDebut = now();

  // req.params.date = :date = date envoyé par le client
  var query = {
    text: 'SELECT * FROM relevemeteo WHERE datedebut = $1',
    values: [req.params.date]
  };

  db.query(query, (err, result) => {

    if (!err) {

      var tFin = now(tDebut);

      var dureeRequete = (tFin - tDebut) * 0.001;

      console.log("Temps récupération BDD date ( secondes ): " + dureeRequete);

      var donnees = result.rows;
      donnees.push(JSON.stringify(dureeRequete));
      res.end(JSON.stringify(donnees));

    } else {
      console.log("Erreur requete");
    };

  });
});


// Récupérer les relevés d'un certain site ( PG )
app.get('/relevemeteo/site/:idSite', function (req, res) {

  var tDebut = now();

  var query = {
    text: 'SELECT * FROM relevemeteo WHERE id_sitemeteo = $1',
    values: [req.params.idSite]
  };

  db.query(query, (err, result) => {

    if (!err) {

      var tFin = now(tDebut);
      var dureeRequete = (tFin - tDebut) * 0.001;

      console.log("Temps récupération BDD site ( secondes ): " + dureeRequete);

      var donnees = result.rows;
      donnees.push(JSON.stringify(dureeRequete));
      res.end(JSON.stringify(donnees));

    } else {
      console.log("Erreur requete");
    };

  });
});


// Récupérer les relevés d'un certain site à une certaine date ( PG )
app.get('/relevemeteo/site/:idSite/date/:date', function (req, res) {

  var tDebut = now();
  var query = {
    text: 'SELECT * FROM relevemeteo WHERE id_sitemeteo = $1 AND datedebut = $2',
    values: [req.params.idSite, req.params.date]
  };

  db.query(query, (err, result) => {

    if (!err) {

      var tFin = now(tDebut);
      var dureeRequete = (tFin - tDebut) * 0.001;

      console.log("Temps récupération BDD site + date ( secondes ): " + dureeRequete);

      var donnees = result.rows;
      donnees.push(JSON.stringify(dureeRequete));
      res.end(JSON.stringify(donnees));

    } else {
      console.log("Erreur requete");
    };

  });
});


// Récupèrer les relevés sur une certaine periode ( PG )
app.get('/relevemeteo/periode/:debut/:fin', function (req, res) {

  var tDebut = now();

  var query = {
    text: 'SELECT * FROM relevemeteo WHERE datedebut >= $1 AND datedebut <= $2',
    values: [req.params.debut, req.params.fin]
  };

  db.query(query, (err, result) => {

    if (!err) {

      var tFin = now(tDebut);
      var dureeRequete = (tFin - tDebut) * 0.001;

      console.log("Temps récupération BDD période ( secondes ): " + dureeRequete);

      var donnees = result.rows;
      donnees.push(JSON.stringify(dureeRequete));
      res.end(JSON.stringify(donnees));

    } else {
      console.log("Erreur requete");
    };
  });
});


// Récupèrer les relevés d'un certain site sur une certaine periode ( PG )
app.get('/relevemeteo/site/:idSite/periode/:debut/:fin', function (req, res) {

  var tDebut = now();
  var query = {
    text: 'SELECT * FROM relevemeteo WHERE id_sitemeteo = $1 AND datedebut >= $2 AND datedebut <= $3',
    values: [req.params.idSite, req.params.debut, req.params.fin]
  };

  db.query(query, (err, result) => {

    if (!err) {

      var tFin = now(tDebut);
      var dureeRequete = (tFin - tDebut) * 0.001;

      console.log("Temps récupération BDD site + période ( secondes ): " + dureeRequete);

      var donnees = result.rows;
      donnees.push(JSON.stringify(dureeRequete));
      res.end(JSON.stringify(donnees));

    } else {
      console.log("Erreur requete");
    };

  });
});

// Inverser matrice ( version transit des données via fichier )
app.get('/matrice_fichier/id/:id/langage/:langage', function (req, res) {

  var matriceIsGood = new EventEmitter(); // Permet d'indiquer quand la matrice a finit d'être inversée
  var resultat = []; // forme finale : [ [matrice non inversé], temps récupération matrice non inversée, [[matrice inversée], temps inversion], temps recuperation matrice inverse ]

  var tDebutRequete = now();

  // On récupère les elements de la matrice de manière ordonnée ( ligne par ligne et colonne par colonne )
  var query = {
    text: 'SELECT valeur FROM valeur_matrice where id_matrice = $1 ORDER BY ligne, colonne',
    values: [req.params.id],
    rowMode: 'array'
  };

  db.query(query, (err, result) => {

    if (!err) {

      var tFinRequete = now(tDebutRequete);

      var dureeRequete = (tFinRequete - tDebutRequete) * 0.001;

      var nombreElementsMatrice = result.rowCount;

      var tailleMatrice = Math.sqrt(nombreElementsMatrice);

      tailleMatrice = Math.trunc(tailleMatrice);

      console.log("Temps récupération BDD matrice ( secondes ): " + dureeRequete);

      var matrice = [];

      for (var i = 0; i < nombreElementsMatrice; i++) {
        matrice.push(result.rows[i][0]);
      }

      resultat.push(matrice);
      resultat.push(dureeRequete);


      var jsonDataObj = {"matrice" : matrice}; // Objet JSON envoyé au serveur d'algorithmes

      var tDebutRecuperationMatriceInverse = now();

      // envoie au serveur d'algorithmes de la matrice a nverser
      request.post(
        serveur_algorithmes + '/matrice_fichier/id/ '+ req.params.id + '/langage/' + req.params.langage,
        { json: jsonDataObj },

        function (error, response, body) {
            // matrice nverse reç
            if (!error && response.statusCode == 200) {

              var tFinRecuperationMatriceInverse = now(tDebutRecuperationMatriceInverse);
              var dureeRecuperationMatriceInverse = (tFinRecuperationMatriceInverse - tDebutRecuperationMatriceInverse) * 0.001;

              var tmpBody = JSON.parse(body);

              resultat.push(tmpBody[0]);
              resultat.push(tmpBody[1]);
              resultat.push(dureeRecuperationMatriceInverse);

		           res.end(JSON.stringify(resultat));
            }
        }
      );

    } else {
      console.log("Erreur requete");
    };
  });
});


// Ajouter matrice carré BDD
// id et taille via l'url
app.get('/insertion_matrice/id/:id/taille/:taille', function (req, res) {

  // remplir la variable chaine avec la matrice au format string
  // ex : '1 2 3 4' pour la matrice 1(1,1) ; 2(1,2) ; 3(2,1) ; 4(2,2)

  var chaine = '';

  var valeurs = chaine.split(" ");
  var id_matrice = req.params.id;
  var taille = req.params.taille;
  var i, j, position = 0;

  for (i = 1; i <= taille; i++) {
    for (j = 1; j <= taille; j++) {

      var query = {
        text: 'INSERT INTO valeur_matrice(id_matrice, valeur, ligne, colonne) VALUES($1, $2, $3, $4)',
        values: [id_matrice, valeurs[position], i, j]
      };

      db.query(query, (err, result) => {
        if (err) {
          console.log("Erreur requete");
        }
      });

      position = position + 1;
    }
  }

  res.end();

});

//Port d'écoute
app.listen(port, host);
