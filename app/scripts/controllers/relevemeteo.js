'use strict';

angular.module('testmaquetteApp')
	.controller('RelevemeteoCtrl', function ($scope, serviceAjax) {

		$scope.chargement_en_cours = true;

			serviceAjax.getCourbeDeCharge().then(function(resultat) {

				var start_time = new Date().getTime();

				$scope.tempsRequete = resultat.data[resultat.data.length - 1];

					var yTrace1 = [];
					var yTrace2 = [];
					var abscisses = [];

					// energie
					for(var i = 0; i<resultat.data.length - 1; i++){

							yTrace1.push(resultat.data[i].EA);
							yTrace2.push(resultat.data[i].ER);
							abscisses.push(resultat.data[i].Date)
					}

					var trace1 = {
					  x: abscisses,
					  y: yTrace1,
					  name: 'Actifs',
					  type: 'scatter'
					};

					var trace2 = {
						x: abscisses,
 					 	y: yTrace2,
					  name: 'Réactifs',
					  type: 'scatter'
					};

					var data = [trace1, trace2];

					trace1 =
					  [{x: [resultat.data[0].Date, resultat.data[1].Date, resultat.data[2].Date],
					  y: [resultat.data[0].EA, resultat.data[1].EA, resultat.data[2].EA]}];

						$scope.data = data;

								var selectorOptions = {
								    buttons: [{
								        step: 'month',
								        stepmode: 'backward',
								        count: 1,
								        label: '1m'
								    }, {
								        step: 'month',
								        stepmode: 'backward',
								        count: 6,
								        label: '6m'
								    }, {
								        step: 'year',
								        stepmode: 'todate',
								        count: 1,
								        label: 'YTD'
								    }, {
								        step: 'year',
								        stepmode: 'backward',
								        count: 1,
								        label: '1y'
								    }, {
								        step: 'all',
								    }],
								};

								$scope.layout = { height: 600, width: 1000, title: 'Courbe de charge', xaxis: {
					            rangeselector: selectorOptions,
					            rangeslider: {}
					        },
					        yaxis: {
					            fixedrange: true
					        }};
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
