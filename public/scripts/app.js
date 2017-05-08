'use strict';

/**
 * @ngdoc overview
 * @name imputationApp
 * @description
 * # imputationApp
 *
 * Main module of the application.
 */
var angularApp = angular.module('imputationApp', [
	'ngRoute', 'ngMaterial', 'ngMessages'
]);

angularApp.factory('safeApply', ['$rootScope',function($rootScope) {
	return function($scope){
		var phase = null;
		if($scope.$root){
			phase = $scope.$root.$$phase;
			if(!(phase == '$apply' || phase == '$digest')) {
				$scope.$apply();
			}
		}else{
			phase = $scope.$$phase;
			if(!(phase == '$apply' || phase == '$digest')) {
				$scope.$apply();
			}
		}
	};
}]);


angularApp.directive('footer', function () {
	return {
		restrict: 'A', //This means that it will be used as an attribute and NOT as an element
		replace: true,
		templateUrl: "/scripts/directives/footer.html",
		controller: ['$scope', '$filter', function ($scope, $filter) {
			// Your behaviour goes here :)
		}]
	}
});

angularApp.directive('header', function () {
	return {
		restrict: 'A', //This means that it will be used as an attribute and NOT as an element
		replace: true,
		templateUrl: "/scripts/directives/header.html",
		controller: ['$scope', '$filter', function ($scope, $filter) {
			// Your behaviour goes here :)
		}]
	}
});


angularApp.config(function ($routeProvider,$mdThemingProvider,$mdDateLocaleProvider) {
	$mdThemingProvider.theme('dark-grey')
	.backgroundPalette('grey')
	.dark();
	$mdThemingProvider.theme('default')
	.primaryPalette('indigo', {
		'default': '500',
		'hue-1': '400',
		'hue-2': '800',
		'hue-3': 'A100'
	})
	.accentPalette('orange')
	.warnPalette('deep-orange')
	.backgroundPalette('grey');


	$mdDateLocaleProvider.formatDate = function(date) {
		return moment(date).format('DD.MM.YYYY');
	};


	$routeProvider
	.when('/home', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl',
		controllerAs: 'main'
	})
	.when('/applications', {
		templateUrl: 'views/impute.html',
		controller: 'ImputeCtrl',
		controllerAs: 'impute'
	})
	.when('/dashboard', {
		templateUrl: 'views/dashboard.html',
		controller: 'DashboardCtrl',
		controllerAs: 'dashboard'
	})
	.when('/settings', {
		templateUrl: 'views/settings.html',
		controller: 'SettingsCtrl',
		controllerAs: 'settings'
	})
	.when('/about', {
		templateUrl: 'views/about.html',
		controller: 'AboutCtrl',
		controllerAs: 'about'
	})
	.otherwise({
		redirectTo: '/home'
	});
});
