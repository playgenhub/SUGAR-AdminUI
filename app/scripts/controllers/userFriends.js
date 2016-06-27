// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc function
  * @name sgaAdminApp.controller:UsersCtrl
  * @description
  * # UsersCtrl
  * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('UsersFriendsCtrl', [
  '$scope', '$routeParams', '$location', 'modalManager', 'UsersApi', function($scope, $routeParams, $location, modalManager, UsersApi) {
    $scope.itemtype = $routeParams.itemtype;
    $scope.itemId = $routeParams.itemId;
    
    $scope.userName = '';

    $scope.items = [];
    $scope.pendings = [];
    $scope.requests = [];

    $scope.pagination = {
      perPage: 10,
      currentPage: 1
    };
    $scope.init = function() {
      $scope.items = [];
      $scope.pendings = [];
      $scope.requests = [];
        UsersApi['friends'].list($scope.itemId).then(function(res) {
        if ((res != null ? res.status : void 0) === 200 && (res.data != null)) {
          $scope.items = res.data;
        }
        });
        UsersApi['friends'].listPending($scope.itemId).then(function(res){
          if (res.status === 200 && res.data != null)
          {
            $scope.pendings = res.data;
          }
        });
       UsersApi['friendRequests'].list($scope.itemId).then(function(res){
       if (res != null && res.data[0] != null)
       {
           $scope.requests = res.data;
       }
    });
       UsersApi['users'].get($scope.itemId).then(function(res){
        if (res.status === 200 && res.data != null)
        {
          $scope.userName = res.data.Name;
        }
      });
    };
    $scope.add = function(item) {
      return modalManager.open('addFriend', {
        itemtype: $scope.itemtype,
        itemId: $scope.itemId,
        item: item
      });
    };
    $scope.remove = function(item){
        var friendship = "{ RequestorId: " + item.Id + ", AcceptorId: " + $scope.itemId + ", Accepted: false }"
        UsersApi['friends'].update(friendship).then(function(res) {
          $scope.init();
      });
    }; 
    $scope.removePending = function(item){
        var friendship = "{ RequestorId: " + $scope.itemId + ", AcceptorId: " + item.Id + ", Accepted: false }"
        UsersApi['friendRequests'].update(friendship).then(function(res) {
          $scope.init();
      });
    };
    $scope.accept = function(item){
        var friendship = "{ RequestorId: " + item.Id + ", AcceptorId: " + $scope.itemId + ", Accepted: true }"
        UsersApi["friendRequests"].update(friendship).then(function(res) {
             $scope.init();
        });
    };
    $scope.reject = function(item){
        var friendship = "{ RequestorId: " + item.Id + ", AcceptorId: " + $scope.itemId + ", Accepted: false }"
        UsersApi["friendRequests"].update(friendship).then(function(res) {
             $scope.init();
        });
    }; 
    return $scope.$on('savedItem', function(event, args) {
      return $scope.init();
    });
    
  }
]).controller('addFriendModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'UsersApi', 'modalManager', 'modaldata', function($scope, $rootScope, $uibModalInstance, UsersApi, modalManager, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    $scope.itemId = modaldata.itemId;

    $scope.exists = true;
    if (modaldata.item != null) {
      $scope.item = modaldata.item;
    } else if (modaldata.itemid != null) {
      UsersApi[$scope.itemtype].get(modaldata.itemid).then(function(data) {
        if ((data != null ? data.data : void 0) != null) {
          return $scope.item = data.data;
        }
      });
    }
    
    //our buttons
    $scope.close = function(item) {         
        $scope.exists = true;
        $uibModalInstance.close();
        return modalManager.open('showFriends', {
          itemtype: 'users',
          item: item
        });
    };
    $scope.add = function(item) {
         UsersApi['users'].get($scope.txtBox)
        
        .then(function(res)
        {
            if (res.data[0]!=null)
            {
                //put the data backwards for testing as groups cannot request users join
                var friendship = "{ RequestorId: " + $scope.itemId + ", AcceptorId: " + res.data[0].Id + " }"
                UsersApi['friends'].create(friendship)

                .then(function(res)
                {
                  $uibModalInstance.close();
                  $rootScope.$broadcast('savedItem')
                });
            }
            else
                $scope.exists = false;
        });
    };
  }
]);
