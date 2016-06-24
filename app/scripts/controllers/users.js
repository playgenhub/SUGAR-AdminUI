// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc function
  * @name sgaAdminApp.controller:UsersCtrl
  * @description
  * # UsersCtrl
  * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('UsersCtrl', [
  '$scope', '$routeParams', '$location', 'modalManager', 'Api', function($scope, $routeParams, $location, modalManager, Api) {
    $scope.itemtype = $routeParams.itemtype;
    $scope.itemid = $routeParams.itemid;
    
    $scope.items = [];
    $scope.pagination = {
      perPage: 10,
      currentPage: 1
    };
    $scope.init = function() {
      return Api['users'].list().then(function(res) {
        if (res.status === 200 && res.data != null) {
          $scope.items = res.data;
          // if ($routeParams.itemid != null) {
          //   return $scope.items.forEach(function(i) {
          //     var a, b;
          //     a = '' + i[$scope.config.display.individualId];
          //     b = '' + $scope.itemid;
          //     if (a === b) {
          //       return $scope.select(i);
          //     }
          //   });
          // }
        }
      });
    };
    $scope.select = function(item) {
      return modalManager.open('edit', {
        itemtype: 'users',
        item: item
      });
    };
    $scope["delete"] = function(item) {
      return modalManager.open('delete', {
        itemtype: 'users',
        item: item
      });
    };
    $scope.create = function() {
      return modalManager.open('create', {
        itemtype: 'users'
      });
    };
    $scope.showFriends = function(item) {
      return modalManager.open('showFriends', {
        itemtype: 'users',
        item: item
      });
    };
    $scope.showGroups = function(item) {
      return modalManager.open('showGroups', {
        itemtype: 'users',
        item: item
      });
    };
    return $scope.$on('savedItem', function(event, args) {
      return $scope.init();
    });
  }
]).controller('EditModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'Api', 'modalManager', 'modaldata', function($scope, $rootScope, $uibModalInstance, Api, modalManager, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    if (modaldata.item != null) {
      $scope.item = modaldata.item;
    } else if (modaldata.itemid != null) {
      $scope.item = {};
      Api[$scope.itemtype].get(modaldata.itemid).then(function(data) {
        if ((data != null ? data.data : void 0) != null) {
          return $scope.item = data.data;
        } else {
          return $uibModalInstance.close();
        }
      });
    } else {
      $uibModalInstance.close();
    }
    $scope.editables = $scope.config.editables.view;
    $scope.editables.forEach(function(e) {
      return e.original = $scope.item[e.key];
    });
    $scope.link = function(itemtype, id) {
      return modalManager.open('edit', {
        itemtype: itemtype,
        itemid: id
      });
    };
    $scope.save = function() {
      return Api[$scope.itemtype].update($scope.item.Id, $scope.item).then(function() {
        $uibModalInstance.close();
        return $rootScope.$broadcast('savedItem');
      });
    };
    return $scope.close = function() {
      $scope.editables.forEach(function(e) {
        return $scope.item[e.key] = e.original;
      });
      return $uibModalInstance.close();
    };
  }
]).controller('CreateModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'Api', 'modaldata', function($scope, $rootScope, $uibModalInstance, Api, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    $scope.item = {};
    
    $scope.save = function() {
        return Api[$scope.itemtype].create($scope.item).then(function() {
            $uibModalInstance.close();
            return $rootScope.$broadcast('savedItem');
        });
    };
    return $scope.close = function() {
      return $uibModalInstance.close();
    };
  }
]).controller('ConfirmDeleteModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'Api', 'modaldata', function($scope, $rootScope, $uibModalInstance, Api, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    if (modaldata.item != null) {
      $scope.item = modaldata.item;
    } else if (modaldata.itemid != null) {
      $scope.item = {};
      Api[$scope.itemtype].get(modaldata.itemid).then(function(data) {
        return console.log(data);
      });
    }
    $scope["delete"] = function() {
      return Api[$scope.itemtype]["delete"]($scope.item.Id).then(function() {
        $uibModalInstance.close();
        return $rootScope.$broadcast('savedItem');
      });
    };
    return $scope.close = function() {
      return $uibModalInstance.close();
    };
  }
]).controller('showGroupsModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'Api', 'modalManager', 'modaldata', function($scope, $rootScope, $uibModalInstance, Api, modalManager, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    $scope.item = modaldata.item;

    Api['userGroups'].list($scope.item.Id).then(function(res) {
    if ((res != null ? res.status : void 0) === 200 && (res.data != null)) {
        $scope.items = res.data;
    }
    });
    
    
    //our buttons
    $scope.close = function() {
      return $uibModalInstance.close();
    };
    $scope.add = function(item) {
        $uibModalInstance.close();
        return modalManager.open('addGroup', {
        itemtype: $scope.itemtype,
        item: item
        });
    };
    $scope.remove = function(item){
        var friendship = "{ RequestorId: " + $scope.item.Id + ", AcceptorId: " + item.Id + ", Accepted: false }"
        Api['userGroups'].update(friendship).then(function(res) {
            $uibModalInstance.close();
            return modalManager.open('showGroups', {
            itemtype: $scope.itemtype,
            item: $scope.item
            });
        });
    };
  }
]).controller('addGroupModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'Api', 'modalManager', 'modaldata', function($scope, $rootScope, $uibModalInstance, Api, modalManager, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    
    if (modaldata.item != null) {
      $scope.item = modaldata.item;
    } else if (modaldata.itemid != null) {
      Api[$scope.itemtype].get(modaldata.itemid).then(function(data) {
        if ((data != null ? data.data : void 0) != null) {
          return $scope.item = data.data;
        }
      });
    }
    
    //our buttons
    $scope.close = function(item) {
        $scope.config.userGroups.ExistingGroup.exists = true;
        return $uibModalInstance.close();
    };
    
    $scope.add = function(item) {
        Api['groups'].get($scope.txtBox)
        
        .then(function(res)
        {
            if (res.data[0]!=null)
            {
                //put the data backwards for testing as groups cannot request users join
                var friendship = "{ RequestorId: " + item.Id + ", AcceptorId: " + res.data[0].Id + ", AutoAccept: true }"
                Api['members'].create(friendship);
                $uibModalInstance.close();
            }
            else
                $scope.config.userGroups.ExistingGroup.exists = false;
        });
    };
  }
]).controller('showFriendsModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'Api', 'modalManager', 'modaldata', function($scope, $rootScope, $uibModalInstance, Api, modalManager, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    $scope.item = modaldata.item;
    $scope.pendings = [];

        Api['friends'].list($scope.item.Id).then(function(res) {
        if ((res != null ? res.status : void 0) === 200 && (res.data != null)) {
          $scope.items = res.data;
        }
        });
        Api['friends'].listPending($scope.item.Id).then(function(res){
          if (res.status === 200 && res.data != null)
          {
            $scope.pendings = res.data;
          }
        });
       Api['friendRequests'].list($scope.item.Id).then(function(res){
       if (res != null && res.data[0] != null)
       {
           $scope.config.friends.requests.hasRequests = true;
       } 
       else
       {
           $scope.config.friends.requests.hasRequests = false;
       }
    });
    //our buttons
    $scope.close = function() {
      return $uibModalInstance.close();
    };
    $scope.add = function(item) {
      $uibModalInstance.close();
      return modalManager.open('addFriend', {
        itemtype: $scope.itemtype,
        item: item
      });
    };
        $scope.showFriendRequests = function(item) {
            $uibModalInstance.close();
      return modalManager.open('showFriendRequests', {
          itemtype: $scope.itemtype,
          item: item
      });
    };
        $scope.remove = function(item){
            var friendship = "{ RequestorId: " + item.Id + ", AcceptorId: " + $scope.item.Id + ", Accepted: false }"
            Api['friends'].update(friendship).then(function(res) {
            $uibModalInstance.close();
            return modalManager.open('showFriends', {
            itemtype: $scope.itemtype,
            item: $scope.item
            });
          });
        }; 
        $scope.removePending = function(item){
            var friendship = "{ RequestorId: " + $scope.item.Id + ", AcceptorId: " + item.Id + ", Accepted: false }"
            Api['friendRequests'].update(friendship).then(function(res) {
            $uibModalInstance.close();
            return modalManager.open('showGroups', {
            itemtype: $scope.itemtype,
            item: $scope.item
            });
          });
        };
  }
]).controller('addFriendModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'Api', 'modalManager', 'modaldata', function($scope, $rootScope, $uibModalInstance, Api, modalManager, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    
    $scope.config.friends.ExistingPlayer.exists = true;
    if (modaldata.item != null) {
      $scope.item = modaldata.item;
    } else if (modaldata.itemid != null) {
      Api[$scope.itemtype].get(modaldata.itemid).then(function(data) {
        if ((data != null ? data.data : void 0) != null) {
          return $scope.item = data.data;
        }
      });
    }
    
    //our buttons
    $scope.close = function(item) {         
        $scope.config.friends.ExistingPlayer.exists = true;
        $uibModalInstance.close();
        return modalManager.open('showFriends', {
          itemtype: 'users',
          item: item
        });
    };
    $scope.add = function(item) {
         Api['users'].get($scope.txtBox)
        
        .then(function(res)
        {
            if (res.data[0]!=null)
            {
                //put the data backwards for testing as groups cannot request users join
                var friendship = "{ RequestorId: " + item.Id + ", AcceptorId: " + res.data[0].Id + " }"
                Api['friends'].create(friendship)

                .then(function(res)
                {
                  $uibModalInstance.close();
                  return modalManager.open('showFriends', {
                    itemtype: 'users',
                    item: item
                  });
                });
            }
            else
                $scope.config.friends.ExistingPlayer.exists = false;
        });
    };
  }
]).controller('showFriendRequestsModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'Api', 'modalManager', 'modaldata', function($scope, $rootScope, $uibModalInstance, Api, modalManager, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    $scope.item = modaldata.item;
    
    Api['friendRequests'].list($scope.item.Id).then(function(res) {
        if ((res != null ? res.status : void 0) === 200 && (res.data != null)) {
          $scope.items = res.data;
        }
    });
    
    //our buttons
    $scope.close = function() {
      $uibModalInstance.close();
      return modalManager.open('showFriends', {
        itemtype: $scope.itemtype,
        item: $scope.item
      });
    };
    $scope.accept = function(item){
        var friendship = "{ RequestorId: " + item.Id + ", AcceptorId: " + $scope.item.Id + ", Accepted: true }"
        Api["friendRequests"].update(friendship).then(function(res) {
            $uibModalInstance.close();
            return modalManager.open('showFriends', {
            itemtype: $scope.itemtype,
            item: $scope.item
        });
      });
    };
    $scope.reject = function(item){
        var friendship = "{ RequestorId: " + item.Id + ", AcceptorId: " + $scope.item.Id + ", Accepted: false }"
        Api["friendRequests"].update(friendship).then(function(res) {
            $uibModalInstance.close();
            return modalManager.open('showFriends', {
            itemtype: $scope.itemtype,
            item: $scope.item
        });
      });
    };  
  }
]);
