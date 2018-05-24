'use strict';

/**
 * @ngdoc function
 * @name testmaquetteApp.controller:PeriodeFormulaireCtrl
 * @description
 * # PeriodeFormulaireCtrl
 * Controller of the testmaquetteApp
 */
angular.module('testmaquetteApp')
  .controller('PeriodeFormulaireCtrl', function ($scope, serviceAjax) {

    $scope.data = [[]];

    var getGraphPeriode = function (dateForm) {

      $scope.debut = dateForm.year + "-" + dateForm.month + "-" + dateForm.day + " " + dateForm.hour + ":" + dateForm.minute + ":00";
      $scope.fin = dateForm.yearPeriode + "-" + dateForm.monthPeriode + "-" + dateForm.dayPeriode + " " + dateForm.hourPeriode + ":" + dateForm.minutePeriode + ":00";

      console.log($scope.debut);
      console.log($scope.fin);

      serviceAjax.getPeriode($scope.debut, $scope.fin).then(function (resultat) {
        $scope.releves = resultat.data;

        $scope.tempsRequete = $scope.releves[$scope.releves.length-1];

        $scope.labels = [];

        var tDebut = new Date().getTime();

        for (var i = 0; i < $scope.releves.length - 1; i++) {
          $scope.labels[i] = $scope.releves[i].datedebut;
        }

        console.log($scope.labels);

        for (var i = 0; i < $scope.releves.length - 1; i++) {
          $scope.data[0][i] = $scope.releves[i].temperature;
        }

        var tFin = new Date().getTime();

        var timeSpent = (tFin - tDebut);

        $scope.tempsAngular = timeSpent;
        //$scope.data = $scope.releves.temperature;

        $scope.series = ['Courbe 1'];

      }, function () {
        console.log("non recup");
      });
    }

    $scope.envoie = function (post) {
      getGraphPeriode(post);
    }

  });
