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
	
	function init(){
		$scope.loadPosts();
	}

	$scope.loadPosts=function(){
		$http
		.get('/api/blogpost')
		.then(function(posts){
			$scope.posts=posts;
		})
	}

	$scope.createPost=function(post){
		$http.post('/api/blogpost', post)
	}

	init();
}]);
