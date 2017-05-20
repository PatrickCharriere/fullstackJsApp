'use strict';

/**
 * @ngdoc overview
 * @name fullstackJsApp
 * @description
 * # fullstackJsApp
 *
 * Main module of the application.
 */
var angularApp = angular.module('fullstackJsApp', [
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

app.factory("authenticationSvc", function($http, $q, $window) {
	var userInfo;

	function login(userName, password) {
		var deferred = $q.defer();

		$http.post("/api/login", {
			name: userName,
			password: password
		}).then(function(result) {
			userInfo = {
				accessToken: result.data.access_token,
				userName: result.data.userName
			};
			$window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
			deferred.resolve(userInfo);
		}, function(error) {
			deferred.reject(error);
		});

		return deferred.promise;
	}

	return {
		login: login
	};
});

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
	.when('/blog', {
		templateUrl: 'views/blog.html',
		controller: 'BlogCtrl',
		controllerAs: 'blog'
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
	.when('/article', {
		templateUrl: 'article.html',
		controller: 'ArticleCtrl',
		controllerAs: 'article'
	})
	.when('/404', {
		templateUrl: '404.html',
		controller: 'noFoundCtrl',
		controllerAs: 'notFound'
	})
	.when('/login', {
		templateUrl: 'login.html',
		controller: 'logInCtrl',
		controllerAs: 'login'
	})
	.otherwise({
		redirectTo: '/home'
	});
});
