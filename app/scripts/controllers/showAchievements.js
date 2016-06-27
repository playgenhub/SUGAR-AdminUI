// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc function
  * @name sgaAdminApp.controller:showAchievementsCtrl
  * @description
  * # showAchievementsCtrl
  * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('showAchievementsCtrl', [
  '$scope', '$routeParams', '$location', 'modalManager', 'GamesApi', function($scope, $routeParams, $location, modalManager, GamesApi) {
    $scope.itemtype = $routeParams.itemtype;
    $scope.itemId = $routeParams.itemId;
    
    $scope.items = [];
    $scope.criterias = 1;

    $scope.gameName = '';

    $scope.pagination = {
      perPage: 10,
      currentPage: 1
    };
    $scope.init = function() {
      GamesApi['achievements'].list($scope.itemId).then(function(res) {
        if (res.status === 200 && res.data != null) {
          $scope.items = res.data;
          $scope.range(); 
        }
      });
            GamesApi['games'].get($scope.itemId).then(function(res){
        if (res.status === 200 && res.data != null)
        {
          $scope.gameName = res.data.Name;
        }
      });
    };
    $scope.range = function(min, max, step) {
        if ($scope.items == null)
          return 0;
        step = step || 1;
        min = 0;
        max = $scope.items.length-1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
    $scope.criteriaRange = function(index) {
        if ($scope.items == null)
          return 0;
        var step = 1;
        var min = 1;
        var max = $scope.items[index].CompletionCriteria.length;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
    $scope.remove = function(item){
        GamesApi['achievements'].delete(item.Id).then(function(res) {
            $scope.init();
        });
    };
    $scope.add = function(item) {
        $location.path('/games/' + $scope.itemId + '/achievements/new');
    };
    return $scope.$on('savedItem', function(event, args) {
      return $scope.init();
    });
  }
]);
