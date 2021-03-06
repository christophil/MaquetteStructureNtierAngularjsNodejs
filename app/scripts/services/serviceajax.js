'use strict';

/**
 * @ngdoc service
 * @name testmaquetteApp.serviceAjax
 * @description
 * # serviceAjax
 * Factory in the testmaquetteApp.
 */
angular.module('testmaquetteApp')
   .factory('serviceAjax', function serviceAjax($http) {

      var IP = "localhost:8500";

      return{
         getAll: function(){
            console.log("done");
            return $http.get("http://"+IP+"/relevemeteo");
            //return $http.get("http://localhost:8500/relevemeteo/");
         },
         getPeriode: function(debut,fin){
            return $http.get("http://"+IP+"/relevemeteo/periode/"+debut+"/"+fin);
            //return $http.get("http://localhost:8500/relevemeteo/periode/"+debut+"/"+fin);
         },
         getDate: function(date){
            return $http.get("http://"+IP+"/relevemeteo/date/"+date);
            //return $http.get("http://localhost:8500/relevemeteo/date/"+date);
         },
         getSite: function(idStation){
            return $http.get("http://"+IP+"/relevemeteo/site/"+idStation);
            //return $http.get("http://localhost:8500/relevemeteo/site/"+idStation);
         },
         getMatrice: function(idMatrice,langage){
            return $http.get("http://"+IP+"/matrice_fichier/id/"+idMatrice+"/langage/"+langage);
            //return $http.get("http://localhost:8500/matrice/id/"+idMatrice+"/langage/"+langage);
         },
         getCourbeDeCharge: function(){
            return $http.get("http://"+IP+"/mysql");
         }
      }
   });
