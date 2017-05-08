'use strict';

/**
 * @ngdoc function
 * @name imputationApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the imputationApp
 */
angular.module('imputationApp')
.controller('HeaderCtrl', ['$scope', '$location', '$timeout','$log','safeApply',
	function ($scope, $location, $timeout,$log,safeApply) {
		$scope.selectedTab = null;

		$scope.views = [ {
				name: "Home",
				glyph: "glyphicon-home",
				id: 0,
				active: false
			}, {
				name: "Applications",
				glyph: "glyphicon-calendar",
				id: 1,
				active: false
			}, {
				name: "Dashboard",
				glyph: "glyphicon-dashboard",
				id: 2,
				active: false
			}, {
				name: "Settings",
				glyph: "glyphicon-cog",
				id: 3,
				active: false
			}, {
				name: "About",
				glyph: "glyphicon-paperclip",
				id: 4,
				active: false
			}
		];

		$scope.searchObj=function(obj, query) {
			for (var i=0;i<$scope.views.length;i++) {
				if($scope.views[i].name.toLowerCase() === query) { 
					$scope.views[i].active = true;
					$scope.result = i;
				}
			}
		}

		$scope.$on('$routeChangeStart', function(next, current) {
			var path = $location.path();
			path = path.substr(1, path.length-1);
			$scope.searchObj($scope.views, path)
			if($scope.result >= 0){
				$scope.selectedTab = $scope.result;
			}
			$scope.result = -1;
		});

		$scope.goto = function(page){
			$location.path('/'+page.toLowerCase());
			safeApply($scope);
		}

		$scope.init=function(){
			/*var path = $location.path();
			path = path.substr(1, path.length-1);
			$scope.currentNavItem = path;
			console.log($scope.currentNavItem)*/
			
		}
		$scope.init();

}]);

	//class="active"
