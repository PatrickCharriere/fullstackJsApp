'use strict';

/**
 * @ngdoc function
 * @name imputationApp.controller:ImputeCtrl
 * @description
 * # ImputeCtrl
 * Controller of the imputationApp
 */
angular.module('imputationApp')
	.controller('ImputeCtrl', ['$scope','$timeout','safeApply',
		function($scope,$timeout,safeApply) {
	$scope.months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	$scope.fullMonths=['January','February','March','April','May','June','July','August','September','Octocber','November','December'];
	$scope.companyList=[{
		name:"Ingenico",
		BU: {
			name:"Professional Services"
		}
	},{
		name:"Astek",
		BU: {
			name:""
		}
	}];
	$scope.imputation={
		company: "",
		date: "",
		beginTime: "",
		endTime: ""
	};


	$scope.updateCalendarVars=function(){
		var date = new Date();
		$scope.year = date.getFullYear();
		$scope.currentWeekDayNumber = date.getDay();
		if(0===$scope.currentWeekDayNumber)
			$scope.currentWeekDayNumber=7
		$scope.beginWeekDayNumber = date.getDate()-$scope.currentWeekDayNumber;
		$scope.endWeekDayNumber = date.getDate()+$scope.numberOfDaysInWeek-$scope.currentWeekDayNumber;
		$scope.month = date.getMonth();
	}

	$scope.toggleNumberOfDaysInWeek=function(){
		if(7 === $scope.numberOfDaysInWeek){
			$scope.numberOfDaysInWeek = 5;
		$scope.weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
		safeApply($scope);
		$( ".cl-column-seventh").each(function(){
			$(this).removeClass("cl-column-seventh");
			$(this).addClass("cl-column-fifth");
		});
		}else{
			$scope.numberOfDaysInWeek = 7;
		$scope.weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
		safeApply($scope);
		$( ".cl-column-fifth").each(function(){
			$(this).removeClass("cl-column-fifth");
			$(this).addClass("cl-column-seventh");
		});
	}

	$scope.addImputation();
		console.log($this)
	}

	$scope.init = function(){
		$scope.weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
		$scope.numberOfDaysInWeek = 7;

		$scope.updateCalendarVars();
		$scope.imputation.company="";
		$scope.imputation.category="";
		$scope.imputation.client="";
		$scope.imputation.mission="";
		$scope.imputation.description="";
		var date = new Date();
		date.setSeconds(0);
		date.setMilliseconds(0);
		$scope.imputation.date=date;
		$scope.imputation.beginTime=date;
		$scope.imputation.endTime=date;

	}
	$scope.init();

	}]);
