'use strict';

/**
 * @ngdoc overview
 * @name testmaquetteApp
 * @description
 * # testmaquetteApp
 *
 * Main module of the application.
 */
angular
    .module('testmaquetteApp', [
        'ngRoute', 'chart.js', 'ui.bootstrap', 'jqwidgets', 'plotly'
    ])
    .config(['ChartJsProvider', function(ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            chartColors: ['#FF5252', '#FF8A80'],
            responsive: true
        });

    }])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/relevemeteo', {
                templateUrl: 'views/relevemeteo.html',
                controller: 'RelevemeteoCtrl',
                controllerAs: 'relevemeteo'
            })
            .when('/periode/:debut/:fin', {
                templateUrl: 'views/periode.html',
                controller: 'PeriodeCtrl',
                controllerAs: 'periode'
            })
            .when('/date/:date', {
                templateUrl: 'views/date.html',
                controller: 'DateCtrl',
                controllerAs: 'date'
            })
            .when('/site/:idSite', {
                templateUrl: 'views/site.html',
                controller: 'SiteCtrl',
                controllerAs: 'site'
            })
            .when('/dateFormulaire', {
                templateUrl: 'views/dateformulaire.html',
                controller: 'DateFormulaireCtrl',
                controllerAs: 'dateFormulaire'
            })
            .when('/periodeFormulaire', {
                templateUrl: 'views/periodeformulaire.html',
                controller: 'PeriodeFormulaireCtrl',
                controllerAs: 'periodeFormulaire'
            })
            .when('/matrice', {
                templateUrl: 'views/matrice.html',
                controller: 'MatriceCtrl',
                controllerAs: 'matrice'
            })
            .when('/heatmap', {
                templateUrl: 'views/heatmap.html',
                controller: 'HeatmapCtrl',
                controllerAs: 'heatmap'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
