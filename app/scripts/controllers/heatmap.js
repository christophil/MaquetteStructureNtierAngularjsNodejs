'use strict';

angular.module('testmaquetteApp')
    .controller('HeatmapCtrl', function($scope, serviceAjax) {

      $scope.chargement_en_cours = true;

        serviceAjax.getAll().then(function(resultat) {

            var start_time = new Date().getTime();

            $scope.releves = resultat.data;

            $scope.tempsRequete = $scope.releves[$scope.releves.length - 1 ];

            var donneesReleves = [];

            var tmpTab = [];

            for (var i = 0; i < $scope.releves.length; i++) {

                if (((i % 144) == 0) && (i != 0)) {
                    donneesReleves.push(tmpTab);
                    tmpTab = [];
                }
                tmpTab.push($scope.releves[i].temperature);

            }

            console.log(donneesReleves);

            $scope.data = [{
                z: donneesReleves,
                type: 'heatmap'
            }];

            $scope.layout = { height: 600, width: 1000, title: 'Heatmap' };
            $scope.options = { showLink: false, displayLogo: false };
            $scope.movePoint = function() {

                $scope.data[0].y[4]++;
            }
            $scope.NumberOfSelectedPoints = 0;
            $scope.plotlyEvents = function(graph) {

                graph.on('plotly_selected', function(event) {
                    if (event) {
                        $timeout(function() {
                            $scope.NumberOfSelectedPoints = event.points.length;
                        });
                    }
                });
            };

            $scope.envoie = function(post) {
                getGraphDate(post);
            }

            $scope.chargement_termine = true;
            $scope.tempsAffichageAngular = new Date().getTime() - start_time;
            $scope.chargement_en_cours = false;
        });
    });
