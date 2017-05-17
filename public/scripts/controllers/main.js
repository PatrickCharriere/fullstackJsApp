'use strict';

/**
* @ngdoc function
* @name fullstackJsApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the fullstackJsApp
*/
angular.module('fullstackJsApp')
.controller('MainCtrl', ['$scope','$location','safeApply',
	function($scope, $location,safeApply) {

		$scope.goto = function(page){
			$location.path(page);
			safeApply($scope);
		}

		$scope.init=function() {
			
		}
		$scope.init();
	}
]);
