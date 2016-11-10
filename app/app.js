var common = angular.module('common', ['ngRoute']);

common.config(['$routeProvider',
  	function($routeProvider) {
	    $routeProvider.
		    when('/', {
		        templateUrl: './app/views/home.html',
		        controller: 'homeCtrl'
		    }).
		    when('/accueil', {
		        templateUrl: './app/views/home.html',
		        controller: 'homeCtrl'
		    }).
		    when('/biblio', {
		        templateUrl: './app/views/biblio.html',
		        controller: 'biblioCtrl'
		    }).
			when('/membres', {
				templateUrl: './app/views/membres.html',
				controller: 'membresCtrl'
			}).
		    otherwise({
		        redirectTo: '/home'
		    });
    }]);