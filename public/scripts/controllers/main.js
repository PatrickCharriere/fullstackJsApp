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

		$scope.action1=function(){
			var remote;

			$.ajax({
				type: "GET",
				url: "/getMongoData",
				async: false,
				success : function(data) {
					remote = data;
				}
			});

			console.log(remote)
		}

		$scope.init=function() {
			
		}
		$scope.init();
	}
]);
