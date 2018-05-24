'use strict';

/**
* @ngdoc function
* @name testmaquetteApp.controller:DateformulaireCtrl
* @description
* # DateformulaireCtrl
* Controller of the testmaquetteApp
*/
angular.module('testmaquetteApp')
.controller('DateFormulaireCtrl',  function ($scope,serviceAjax) {
  //$scope.date = "2010-01-01 03:20:00";

  var getGraphDate = function(dateForm){

    $scope.date = dateForm.year + "-" + dateForm.month + "-" + dateForm.day + " " + dateForm.hour + ":" +dateForm.minute + ":00";
    console.log($scope.date);

    $scope.data = [[[]]];

    serviceAjax.getDate($scope.date).then(function(resultat){
      $scope.releves = resultat.data;

      $scope.tempsRequete = $scope.releves[$scope.releves.length-1];
      $scope.labels = [];

      var tDebut = Date.now();



      for (var i = 0; i < $scope.releves.length - 1; i++) {
        $scope.labels[i] = $scope.releves[i].datedebut;
      }

      for (var i = 0; i < $scope.releves.length - 1; i++) {
        $scope.data[0][i] = $scope.releves[i].temperature;
      }

      var tFin = Date.now();

      var timeSpent = (tFin - tDebut);

      $scope.tempsAngular = timeSpent;

      console.log("temps angular " + timeSpent);

      $scope.series = ['Courbe 1'];
    }, function(){
      console.log("non recup");
    });
  }

  serviceAjax.getAll().then(function (resultat) {
    $scope.releves = resultat.data;


  console.log($scope.releves);

var donneesReleves = [];

var tmpTab = [];

for(var i = 0; i<$scope.releves.length; i++){

  if( ((i%144) == 0) && (i!=0)){
    donneesReleves.push(tmpTab);
    tmpTab = [];
  }
  tmpTab.push($scope.releves[i].temperature);

}

console.log(donneesReleves);

$scope.data = [
 {
   z: donneesReleves,
   type: 'heatmap'
 }];

    $scope.layout = {height: 600, width: 1000, title: 'foobar'};
    $scope.options = {showLink: false, displayLogo: false};
    $scope.movePoint = function() {
        // deep watch will pick up change.
        $scope.data[0].y[4]++;
    }
    $scope.NumberOfSelectedPoints = 0;
    $scope.plotlyEvents = function (graph){
      // Create custom events that subscribe to graph
      graph.on('plotly_selected', function(event){
        if (event) {
            $timeout(function() {
                $scope.NumberOfSelectedPoints = event.points.length;
            });
        }
      });
};

  $scope.envoie = function(post){
    getGraphDate(post);
  }

  });

});
