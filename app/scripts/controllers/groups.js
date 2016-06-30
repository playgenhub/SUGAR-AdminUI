// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc function
  * @name sgaAdminApp.controller:GroupsCtrl
  * @description
  * # GroupsCtrl
  * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('GroupsCtrl', [
  '$scope', '$routeParams', '$location', 'modalManager', 'GroupsApi', function($scope, $routeParams, $location, modalManager, GroupsApi) {
    $scope.itemtype = $routeParams.itemtype;
    $scope.itemid = $routeParams.itemid;
    
    $scope.items = [];
    $scope.pagination = {
      perPage: 10,
      currentPage: 1
    };
    $scope.init = function() {
      return GroupsApi['groups'].list().then(function(res) {
        if (res.status === 200 && res.data != null) {
          $scope.items = res.data;
            //get the number of members for each groups
            $scope.allData = [];

              for (var i in $scope.items)
              {
                //loop through our items and pass through the index for us to ensure we set the number of members correctly
                (function(i){
                  GroupsApi['members'].list($scope.items[i].Id).then(function(res)
                  {
                    $scope.items[i].members = null;
                      $scope.items[i].members = res.data.length;
                  });
                })(i);
              }
        }
      });
    };
    $scope.select = function(item) {
      return modalManager.open('editGroup', {
        itemtype: 'groups',
        item: item
      });
    };
    $scope["delete"] = function(item) {
      return modalManager.open('deleteGroup', {
        itemtype: 'groups',
        item: item
      });
    };
    $scope.create = function() {
      return modalManager.open('createGroup', {
        itemtype: 'groups'
      });
    };
    $scope.showMembers = function(item) {
      $location.path('/groups/' + item.Id + '/members')
    };
    $scope.back = function (){
      //go back to main menu
      $location.path("/");
    };
    return $scope.$on('savedItem', function(event, args) {
      return $scope.init();
    });
  }
]).controller('EditGroupModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'GroupsApi', 'modalManager', 'modaldata', function($scope, $rootScope, $uibModalInstance, GroupsApi, modalManager, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    if (modaldata.item != null) {
      $scope.item = modaldata.item;
    } else if (modaldata.itemid != null) {
      $scope.item = {};
      GroupsApi[$scope.itemtype].get(modaldata.itemid).then(function(data) {
        if ((data != null ? data.data : void 0) != null) {
          return $scope.item = data.data;
        } else {
          $rootScope.$broadcast('savedItem')
          return $uibModalInstance.close();
        }
      });
    } else {
      $uibModalInstance.close();
      return $rootScope.$broadcast('savedItem');
    }
    $scope.editables = $scope.config.editables.view;
    $scope.editables.forEach(function(e) {
      return e.original = $scope.item[e.key];
    });
    $scope.link = function(itemtype, id) {
      return modalManager.open('editGroup', {
        itemtype: itemtype,
        itemid: id
      });
    };
    $scope.save = function() {
      return GroupsApi[$scope.itemtype].update($scope.item.Id, $scope.item).then(function() {
        $uibModalInstance.close();
        return $rootScope.$broadcast('savedItem');
      });
    };
    return $scope.close = function() {
      $scope.editables.forEach(function(e) {
        return $scope.item[e.key] = e.original;
      });
      $rootScope.$broadcast('savedItem');
      return $uibModalInstance.close();
    };
  }
]).controller('CreateGroupModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'GroupsApi', 'modaldata', function($scope, $rootScope, $uibModalInstance, GroupsApi, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    $scope.item = {};
    
    $scope.save = function() {
        return GroupsApi[$scope.itemtype].create($scope.item).then(function() {
            $uibModalInstance.close();
            return $rootScope.$broadcast('savedItem');
        });
    };
    return $scope.close = function() {
      $rootScope.$broadcast('savedItem');
      return $uibModalInstance.close();
    };
  }
]).controller('ConfirmDeleteGroupModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'GroupsApi', 'modaldata', function($scope, $rootScope, $uibModalInstance, GroupsApi, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    if (modaldata.item != null) {
      $scope.item = modaldata.item;
    } else if (modaldata.itemid != null) {
      $scope.item = {};
      GroupsApi[$scope.itemtype].get(modaldata.itemid).then(function(data) {
        return console.log(data);
      });
    }
    $scope["delete"] = function() {
      return GroupsApi[$scope.itemtype]["delete"]($scope.item.Id).then(function() {
        $uibModalInstance.close();
        return $rootScope.$broadcast('savedItem');
      });
    };
    return $scope.close = function() {
      $rootScope.$broadcast('savedItem')
      return $uibModalInstance.close();
    };
  }
]);
