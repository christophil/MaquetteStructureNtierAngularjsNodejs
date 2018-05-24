'use strict';

/**
 * @ngdoc function
 * @name testmaquetteApp.controller:PeriodeCtrl
 * @description
 * # PeriodeCtrl
 * Controller of the testmaquetteApp
 */
angular.module('testmaquetteApp')
  .controller('PeriodeCtrl', function ($scope,$routeParams, serviceAjax) {


  	$scope.debut = $routeParams.debut;
  	$scope.fin = $routeParams.fin;


 		$scope.data = [[]];

 		serviceAjax.getPeriode($scope.debut,$scope.fin).then(function(resultat){
 			$scope.releves = resultat.data;

 	    $scope.tempsRequete = $scope.releves[$scope.releves.length-1];

			$scope.labels = [];

			for (var i = 0; i<$scope.releves.length-1; i++) {
				$scope.labels[i] = $scope.releves[i].datedebut;
			}

			for (var i = 0; i<$scope.releves.length-1; i++) {
				$scope.data[0][i] = $scope.releves[i].temperature;
			}

 			$scope.series = ['Courbe 1'];


 		}, function(){
 			console.log("non recup");
 		});



  });
