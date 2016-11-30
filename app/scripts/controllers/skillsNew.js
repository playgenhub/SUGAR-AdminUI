// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc function
 * @name sgaAdminApp.controller:AchievementCtrl
 * @description
 * # AchievementCtrl
 * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('SkillsNewCtrl', [
	'$scope', '$routeParams', '$location', 'modalManager', 'SkillsApi',
	function($scope, $routeParams, $location, modalManager, SkillsApi) {
		$scope.itemtype = $routeParams.itemtype;
		$scope.itemId = $routeParams.itemId;

		$scope.gameFound = true;

		$scope.items = [];
		$scope.criterias = 1;

		$scope.pagination = {
			perPage: 10,
			currentPage: 1
		};

		//make sure that the id is valid to prevent bad data being sent, if not push back to achievemnt screen
		if ($scope.itemId != "global")
		{
			SkillsApi['games'].get($scope.itemId).then(function(res) {
			
				if (res.status === 200 && res.data != null) {

				} else {
					$location.path("/games/" + $scope.itemId + "/skills");
				}
				}).catch(function() {
					$location.path("/games/" + $scope.itemId + "/skills");
				});
			}
		else
		{

		}
		$scope.init = function() {
			SkillsApi['games'].list().then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.items = res.data['response'];
					$scope.range();
				}
			});
		};
		$scope.range = function(min, max, step) {
			step = step || 1;
			min = 1;
			max = $scope.criterias;
			var input = [];
			for (var i = min; i <= max; i += step) {
				input.push(i);
			}
			return input;
		};
		$scope.addCriteria = function() {
			$scope.criterias++;
			return $scope.$broadcast("savedItem");
		}
		$scope.minusCriteria = function() {
			$scope.criterias--;
			return $scope.$broadcast("savedItem");
		}
		$scope.create = function() {

			$scope.achievement = {};
			$scope.achievement.GameId = $scope.itemId == "global" ? null : $scope.itemId;
			$scope.achievement.Name = $scope.item.Name;
			$scope.achievement.Description = $scope.item.Description;
			$scope.achievement.ActorType = $scope.item.ActorType;
			$scope.achievement.Token = $scope.item.Token;

			$scope.achievement.evaluationCriterias = [];
			for (var i = 0; i < $scope.criterias; i++) {
				$scope.achievement.evaluationCriterias[i] = {};
				$scope.achievement.evaluationCriterias[i].Key = $scope.item[i + 1].Key;
				$scope.achievement.evaluationCriterias[i].DataType = $scope.item[i + 1].DataType;
				$scope.achievement.evaluationCriterias[i].ComparisonType = $scope.item[i + 1].ComparisonType;
				$scope.achievement.evaluationCriterias[i].Value = $scope.item[i + 1].Value;
			}
			$scope.achievement.rewards = [];
			$scope.achievement.rewards[0] = {};
			$scope.achievement.rewards[0].Key = $scope.item.Reward.Key;
			$scope.achievement.rewards[0].DataType = $scope.item.Reward.DataType;
			$scope.achievement.rewards[0].Value = $scope.item.Reward.Value;

			// var f = document.getElementById('file').files[0];
			// var r =  new FileReader();
			// r.onloadend = function(e){
			//   var data = e.target.result;
			// }
			// r.readAsArrayBuffer(f);
			SkillsApi['skills'].createSkill($scope.achievement).then(function(res) {
				$location.path('/skills/' + $scope.itemId);
			});
		};
		$scope.back = function() {
			//go back to list of achievements for this game
			$location.path('/skills/' + $scope.itemId);
		};
		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});
	}
]);
