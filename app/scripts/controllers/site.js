'use strict';

/**
 * @ngdoc function
 * @name testmaquetteApp.controller:SiteCtrl
 * @description
 * # SiteCtrl
 * Controller of the testmaquetteApp
 */
angular.module('testmaquetteApp')
  .controller('SiteCtrl', function ($scope, $routeParams, serviceAjax) {

   $scope.site = $routeParams.idSite;

 		$scope.data = [[]];

 		serviceAjax.getSite($scope.site).then(function(resultat){
 			$scope.releves = resultat.data;

    $scope.tempsRequete = $scope.releves[$scope.releves.length-1];

			$scope.labels = [];

			for (var i = 0; i<$scope.releves.length-1; i++) {
				$scope.labels[i] = $scope.releves[i].datedebut;
			}

			for (var j = 0; j<$scope.releves.length-1; j++) {
				$scope.data[0][j] = $scope.releves[j].temperature;
			}

 			$scope.series = ['Courbe 1'];


 		}, function(){
 			console.log("non recup");
 		});


  });
