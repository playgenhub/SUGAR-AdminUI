// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc function
  * @name sgaAdminApp.controller:HeaderCtrl
  * @description
  * # HeaderCtrl
  * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('HeaderCtrl', ['$scope', '$location', 'config', 'Auth', function($scope, $location, config, Auth) {
  $scope.loggedIn = Auth.isAuthenticated;
  $scope.Logout = function () {
      Auth.set(config.tokens.session, null);
      Auth.preApproved = false;
      var returnPath;
      returnPath = $location.search()["return"];
        if (returnPath != null) {
          $location.search('return', null);
          return $location.path(returnPath);
        } else {
          return $location.path('/login');
        }
      };
    }
  ]
);
