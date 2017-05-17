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
	$scope.searchInProgress=false
	$scope.showEditArea=false
	$scope.month = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Nov","Dec")

	function init(){
		$scope.loadPosts();
	}

	$scope.loadPosts=function(){
		$http
		.get('/api/blogpost')
		.then(function(posts){
			$scope.posts=posts.data;
			$scope.posts.sort(function(a, b) {
				return b.posted - a.posted;
			});
			$scope.posts.forEach(function(el){
				var itsDate = new Date(el.posted)
				var date = itsDate.getDate()
				var hours = itsDate.getHours()
				hours = (hours<10)?'0'+hours:hours
				var minutes = itsDate.getMinutes()
				minutes = (minutes<10)?'0'+minutes:minutes

				el.formattedDate = date+' '+$scope.month[itsDate.getMonth()]+' '+itsDate.getFullYear();
			})
		})
	}

	$scope.createPost=function(post){
		$scope.searchInProgress=true
		$http
		.post('/api/blogpost', post)
		.then(function(){
			$scope.post={}
			console.log($scope.post)
			$scope.loadPosts()
			$scope.searchInProgress=false
		})
		.finally(function(){
			$scope.showEditArea=false
			$scope.searchInProgress=false
		})
	}

	$scope.editPost=function(postId){
		$http
		.get('/api/blogpost/' + postId)
		.then(function(postRes){
			$scope.post=postRes.data
			$scope.showEditArea=true
		})
	}

	$scope.updatePost=function(post){
		$scope.searchInProgress=true
		$http
		.put('/api/blogpost/' + post._id, post)
		.then(function(postRes){
			$scope.post={}
			$scope.showEditArea=false
			$scope.loadPosts()
			$scope.searchInProgress=false
		})
	}

	$scope.deletePost=function(postId){
		$http
		.delete("/api/blogpost/"+postId)
		.then(function(ret){
			$scope.loadPosts();
		})
	}

	init();
}]);
