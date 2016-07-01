// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc function
  * @name sgaAdminApp.controller:GroupsCtrl
  * @description
  * # GroupsCtrl
  * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('SkillsCtrl', [
  '$scope', '$routeParams', '$location', 'modalManager', 'SkillsApi', function($scope, $routeParams, $location, modalManager, SkillsApi) {
    $scope.itemtype = $routeParams.itemtype;
    $scope.itemId = $routeParams.itemId;
    
    $scope.items = [];
    $scope.pagination = {
      perPage: 10,
      currentPage: 1
    };
    $scope.init = function() {
      return SkillsApi['games'].list().then(function(res) {
        if (res.status === 200 && res.data != null) {
          $scope.items = res.data;
        }
      });
    };
    $scope.showSkills = function(item) {
      $location.path('/skills/' + item.Id);
    };
        $scope.showGlobal = function() {
      $location.path('/skills/global');
    };
    $scope.back = function (){
      //go back to main menu
      $location.path("/");
    };
    return $scope.$on('savedItem', function(event, args) {
      return $scope.init();
    });
  }
]);
