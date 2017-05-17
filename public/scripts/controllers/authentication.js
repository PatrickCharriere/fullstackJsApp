'use strict';

/**
 * @ngdoc function
 * @name fullstackJsApp.controller:AuthenticationCtrl
 * @description
 * # AuthenticationCtrl
 * Controller of the fullstackJsApp
 */
angular.module('fullstackJsApp')
.controller('AuthenticationCtrl', ['$scope', function($scope) {
	$scope.authenticated = false
	$scope.username = "Justin"

	$scope.signIn = function(){

	}

	$scope.signUp = function(){

	}
}]);
