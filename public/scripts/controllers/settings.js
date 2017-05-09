'use strict';

/**
 * @ngdoc function
 * @name fullstackJsApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the fullstackJsApp
 */
angular.module('fullstackJsApp')
.controller('SettingsCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.createPost=function(post){
		console.log("Title: "+post.title)
		console.log("Content: "+post.body)
		$http.post('/api/savePost', post)
	}
}]);
