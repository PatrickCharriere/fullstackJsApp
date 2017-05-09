'use strict';

/**
 * @ngdoc function
 * @name fullstackJsApp.controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the fullstackJsApp
 */
angular.module('fullstackJsApp')
.controller('BlogCtrl', ['$scope', '$http', function($scope, $http) {
	
	$scope.loadPosts=function(){
		$scope.postList=$http.get('/api/getPosts')
		console.log($scope.postList)
	}

	$scope.loadPosts();
}]);
