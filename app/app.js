var app = angular.module('myApp', ['ui.bootstrap']);

app.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
  });

// ----------------- VOR ----------------------

var unidadInmApp = angular.module('appUnidadInm', ['ui.bootstrap']);

unidadInmApp.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
  });


unidadInmApp.controller('unidadInmCtrl', function ($scope, $http, $timeout) {
    $http.get('ajax/UnidadInmovilizada.php').success(function(data){
        $scope.list = data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 10; //max no of items to display in a page
        $scope.filteredItems = $scope.list.length; //Initially for no filter  
        $scope.totalItems = $scope.list.length;

    });
   
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
});

// ----------------- InfoTech ----------------------

var unidadInmApp = angular.module('appInfoTech', ['ui.bootstrap']);

unidadInmApp.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
  });


unidadInmApp.controller('infoTechCtrl', function ($scope, $http, $timeout) {
    $http.get('ajax/InfoTech.php').success(function(data){
        $scope.list = data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 10; //max no of items to display in a page
        $scope.filteredItems = $scope.list.length; //Initially for no filter  
        $scope.totalItems = $scope.list.length;

    });
   
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
});

// ----------------- backorder ----------------------

    var backorder = angular.module('mybo', ['ngRoute','ui.bootstrap']); 

    backorder.filter('startFrom', function(){
        return function(input, start){
            if(input){
                start = +start;
                return input.slice(start);
            }
            return[];
        }
    });


    backorder.controller('backorderCrtl', function ($scope, $http, $timeout) {
        $http.get('ajax/getBackOrder.php?token=backorder').success(function(data){
            $scope.list = data;
            $scope.currentPage = 1; //current page
            $scope.entryLimit = 30; //max no of items to display in a page
            $scope.filteredItems = $scope.list.length; //Initially for no filter  
            $scope.totalItems = $scope.list.length;

        });
       
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.filter = function() {
            $timeout(function() { 
                $scope.filteredItems = $scope.filtered.length;
            }, 10);
        };
        $scope.sort_by = function(predicate) {
            $scope.predicate = predicate;
            $scope.reverse = !$scope.reverse;
        };
    });

     backorder.config(function($routeProvider) {
        $routeProvider.
          when('/', {
            templateUrl: 'index.html',
            controller: 'backorderCrtl'
          }).
          when('/:NoTicket', {
            templateUrl: 'backorder-detail.html',
            controller: 'backorderCrtl'
          }).
          otherwise({
            redirectTo: '/'
          });
      });

     backorder.factory('boTicket', function($http){

        var cachedData;

        function getData(callback)
        {
          if(cachedData) {
            callback(cachedData);
          } else {
            $http.get('').success(function(data){
              cachedData = data;
              callback(data);
            });
          }
        }

        return {
          list: getData,
          find: function(name, callback){
            getData(function(data) {
              var country = data.filter(function(entry){
                return entry.name === name;
              })[0];
              callback(country);
            });
          }
        };
      });

      backorder.controller('CountryListCtrl', function ($scope, countries){
        countries.list(function(countries) {
          $scope.countries = countries;
        });
      });

      backorder.controller('CountryDetailCtrl', function ($scope, $routeParams, countries){
        countries.find($routeParams.countryName, function(country) {
          $scope.country = country;
        });
      });
