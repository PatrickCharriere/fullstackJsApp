'use strict';

/**
* @ngdoc function
* @name imputationApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the imputationApp
*/
angular.module('imputationApp')
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
