'use strict';

/**
 * @ngdoc function
 * @name testmaquetteApp.controller:MatriceCtrl
 * @description
 * # MatriceCtrl
 * Controller of the testmaquetteApp
 */
angular.module('testmaquetteApp')
    .controller('MatriceCtrl', function($scope, serviceAjax) {

      var start_time;
      var request_time;

        var getMatrice = function(matrice) {
          start_time = new Date().getTime();
            $scope.idMatrice = matrice.idMatrice;
            $scope.langage = matrice.langage;
            console.log($scope.idMatrice + " " + $scope.langage);

            $scope.matriceInitial;
            $scope.matriceInverse ;
            $scope.tempsRequete;
            $scope.tempsInversion;
            $scope.tempsTransfert;
            $scope.tempsRequeteAngular

            serviceAjax.getMatrice($scope.idMatrice, $scope.langage).then(function(resultat) {

                $scope.resultat = resultat.data;
                console.log($scope.resultat);
                $scope.matriceInitial = JSON.stringify($scope.resultat[0]);
                $scope.tempsRequete = $scope.resultat[1];
                $scope.matriceInverse = JSON.stringify($scope.resultat[2]);
                $scope.tempsInversion = $scope.resultat[3];
                $scope.tempsTransfert = $scope.resultat[4];

                request_time = new Date().getTime() - start_time;

                $scope.tempsRequeteAngular = request_time * 0.001;

                $scope.chargement_en_cours = false;
                $scope.resultat_inversion_disponible = true;

            }, function() {
                console.log("non recup");
            });
        }

        $scope.envoie = function(post) {

          start_time = new Date().getTime();

          console.log(start_time);

          $scope.chargement_en_cours = true;
          $scope.resultat_inversion_disponible = false;

            getMatrice(post);
        }

    });
