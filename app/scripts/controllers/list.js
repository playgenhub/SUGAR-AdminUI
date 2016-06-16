// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc function
  * @name sgaAdminApp.controller:ListCtrl
  * @description
  * # ListCtrl
  * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('ListCtrl', [
  '$scope', '$routeParams', '$location', 'modalManager', 'Api', 'listConfigs', function($scope, $routeParams, $location, modalManager, Api, listConfigs) {
    $scope.itemtype = $routeParams.itemtype;
    $scope.itemid = $routeParams.itemid;
    $scope.config = listConfigs[$scope.itemtype];
    if (!$scope.config) {
      return $location.path('/');
    }
    $scope.items = [];
    $scope.pagination = {
      perPage: 10,
      currentPage: 1
    };
    $scope.init = function() {
      return Api[$scope.itemtype].list().then(function(res) {
        if ((res != null ? res.status : void 0) === 200 && (res.data != null)) {
          $scope.items = res.data;
          if ($routeParams.itemid != null) {
            return $scope.items.forEach(function(i) {
              var a, b;
              a = '' + i[$scope.config.display.individualId];
              b = '' + $scope.itemid;
              if (a === b) {
                return $scope.select(i);
              }
            });
          }
        }
      });
    };
    $scope.select = function(item) {
      return modalManager.open('edit', {
        itemtype: $scope.itemtype,
        item: item
      });
    };
    $scope["delete"] = function(item) {
      return modalManager.open('delete', {
        itemtype: $scope.itemtype,
        item: item
      });
    };
    $scope.create = function() {
      return modalManager.open('create', {
        itemtype: $scope.itemtype
      });
    };
    $scope.showMembers = function(item) {
      return modalManager.open('showMembers', {
        itemtype: $scope.itemtype,
        item: item
      });
    };
    $scope.showFriends = function(item) {
      return modalManager.open('showFriends', {
        itemtype: $scope.itemtype,
        item: item
      });
    };
    $scope.showGroups = function(item) {
      return modalManager.open('showGroups', {
        itemtype: $scope.itemtype,
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
      return Api[$scope.itemtype].update($scope.item.id, $scope.item).then(function() {
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
    Object.keys($scope.config.defaultNew).forEach(function(k) {
      return $scope.item[k] = $scope.config.defaultNew[k];
    });
    $scope.editables = $scope.config.editables.create;
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
      return Api[$scope.itemtype]["delete"]($scope.item.id).then(function() {
        $uibModalInstance.close();
        return $rootScope.$broadcast('savedItem');
      });
    };
    return $scope.close = function() {
      return $uibModalInstance.close();
    };
  }
]).controller('showMembersModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'Api', 'modalManager', 'modaldata', function($scope, $rootScope, $uibModalInstance, Api, modalManager, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    $scope.item = modaldata.item;

    {
        Api[/*$scope.itemtype*/'members'].list().then(function(res) {
        if ((res != null ? res.status : void 0) === 200 && (res.data != null)) {
          $scope.items = res.data;
        }
       });
    }
    
    //our buttons
    $scope.close = function() {
      return $uibModalInstance.close();
    };
    return $scope.add = function(item) {
      return modalManager.open('addMember', {
        itemtype: $scope.itemtype,
        item: item
      });
    };
  }
]).controller('showFriendsModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'Api', 'modalManager', 'modaldata', function($scope, $rootScope, $uibModalInstance, Api, modalManager, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    $scope.item = modaldata.item;

    {
        Api[$scope.itemtype].list().then(function(res) {
        if ((res != null ? res.status : void 0) === 200 && (res.data != null)) {
          $scope.items = res.data;
        }
       });
    }
    
    //our buttons
    $scope.close = function() {
      return $uibModalInstance.close();
    };
    $scope.add = function(item) {
      return modalManager.open('addFriend', {
        itemtype: $scope.itemtype,
        item: item
      });
    };
  }
]).controller('showGroupsModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'Api', 'modalManager', 'modaldata', function($scope, $rootScope, $uibModalInstance, Api, modalManager, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    $scope.item = modaldata.item;

    {
        Api[$scope.itemtype].list().then(function(res) {
        if ((res != null ? res.status : void 0) === 200 && (res.data != null)) {
          $scope.items = res.data;
        }
       });
    }
    
    //our buttons
    $scope.close = function() {
      return $uibModalInstance.close();
    };
    $scope.add = function(item) {
        return modalManager.open('addGroup', {
        itemtype: $scope.itemtype,
        item: item
        });
    };
  }
]).controller('addFriendModalCtrl', [
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
        $scope.config.friends.ExistingPlayer.exists = true;
        return $uibModalInstance.close();
    };
    return $scope.add = function(item) {
         $scope.config.friends.ExistingPlayer.exists = false;
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
        $scope.config.playerGroups.ExistingGroup.exists = true;
        return $uibModalInstance.close();
    };
    
    $scope.add = function(item) {
        $scope.config.playerGroups.ExistingGroup.exists = false;
    };
  }
]).controller('addMemberModalCtrl', [
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
        $scope.config.members.ExistingPlayer.exists = true;
        return $uibModalInstance.close();
    };
    return $scope.add = function(item) {
        $scope.config.members.ExistingPlayer.exists = false;
    };
  }
]);
