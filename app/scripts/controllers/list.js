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
    $scope.showAchievements = function(item) {
        return modalManager.open('showAchievements', {
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
      return Api[$scope.itemtype]["delete"]($scope.item.Id).then(function() {
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
        Api['members'].list($scope.item.Id).then(function(res) {
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
        $uibModalInstance.close();
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

        Api['friends'].list($scope.item.Id).then(function(res) {
        if ((res != null ? res.status : void 0) === 200 && (res.data != null)) {
          $scope.items = res.data;
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
]).controller('showGroupsModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'Api', 'modalManager', 'modaldata', function($scope, $rootScope, $uibModalInstance, Api, modalManager, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    $scope.item = modaldata.item;

    {
        Api['groups'].list().then(function(res) {
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
        $uibModalInstance.close();
        return modalManager.open('addGroup', {
        itemtype: $scope.itemtype,
        item: item
        });
    };
  }
]).controller('showAchievementsModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'Api', 'modalManager', 'modaldata', function($scope, $rootScope, $uibModalInstance, Api, modalManager, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    $scope.item = modaldata.item;

    {
        Api['achievements'].list($scope.item.Id).then(function(res) {
        if ((res != null ? res.status : void 0) === 200 && (res.data != null)) {
          $scope.items = res.data;
          var num = res.data.length;
          $scope.allData = [];
          for (var i= 0; i<num; i++)
          {
            $scope.Data = []
            if ($scope.items[i].CompletionCriteria != null)
            {
                $scope.allData.push({Name: $scope.items[i].Name, 
                    Key: $scope.items[i].CompletionCriteria[0].Key, 
                    DataType: $scope.items[i].CompletionCriteria[0].DataType, 
                    ComparisonType: $scope.items[i].CompletionCriteria[0].ComparisonType, 
                    Value: $scope.items[i].CompletionCriteria[0].Value});
            }
            else
            {
                $scope.allData.push({Name: $scope.items[i].Name, Key: null, DataType: null, ComparisonType: null, Value: null});
            }
          }
          $scope.items = $scope.allData;
        }
       });
    }
    
    //our buttons
    $scope.close = function() {
      return $uibModalInstance.close();
    };
    $scope.add = function(item) {
        $uibModalInstance.close();
        return modalManager.open('addAchievement', {
          itemtype: $scope.itemtype,
          item: item
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
        return $uibModalInstance.close();
    };
    return $scope.add = function(item) {
         Api['users'].get($scope.txtBox)
        
        .then(function(res)
        {
            if (res.data[0]!=null)
            {
                //put the data backwards for testing as groups cannot request users join
                var friendship = "{ RequestorId: " + item.Id + ", AcceptorId: " + res.data[0].Id + " }"
                Api['friends'].create(friendship);
                return $uibModalInstance.close();
            }
            else
                $scope.config.friends.ExistingPlayer.exists = false;
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
        $scope.config.playerGroups.ExistingGroup.exists = true;
        return $uibModalInstance.close();
    };
    
    $scope.add = function(item) {
        Api['groups'].get($scope.txtBox)
        
        .then(function(res)
        {
            if (res.data[0]!=null)
            {
                //put the data backwards for testing as groups cannot request users join
                var friendship = "{ RequestorId: " + item.Id + ", AcceptorId: " + res.data[0].Id + ", Accepted: true }"
                Api['members'].create(friendship);
                return $uibModalInstance.close();
            }
            else
                $scope.config.playerGroups.ExistingGroup.exists = false;
        });
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
        Api['users'].get($scope.txtBox)
        
        .then(function(res)
        {
            if (res.data[0]!=null)
            {
                //put the data backwards for testing as groups cannot request users join
                var friendship = "{ RequestorId: " + res.data[0].Id + ", AcceptorId: " + item.Id + ", Accepted: true }"
                Api['members'].create(friendship).then(function(res){
                $uibModalInstance.close();
                return modalManager.open('showMembers', {
                    itemtype: $scope.itemtype,
                    item: item
                });
            });
            }
            else
                $scope.config.members.ExistingPlayer.exists = false;
        });
    };
  }
]).controller('addAchievementModalCtrl', [
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
        //send the achievement data along with the game Id we are currently looking at
        var completeCriteria = "[{ " + "\"Key\": \"" + $scope.item.Key + "\", \"DataType\": " + $scope.item.DataType + ", \"ComparisonType\": " + $scope.item.ComparisonType + ", \"Value\": \"" + $scope.item.Value +  "\" }]";
        var achievement = "{ \"GameId\": " + item.Id + ", \"Name\": \"" + $scope.achievementName + "\", \"CompletionCriteria\": " + completeCriteria + " }";
        Api['achievements'].create(achievement);
        return $uibModalInstance.close();
    };
  }
]);
