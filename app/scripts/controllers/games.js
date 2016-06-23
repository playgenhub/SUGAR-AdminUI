// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc function
  * @name sgaAdminApp.controller:GroupsCtrl
  * @description
  * # GroupsCtrl
  * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('GamesCtrl', [
  '$scope', '$routeParams', '$location', 'modalManager', 'Api', function($scope, $routeParams, $location, modalManager, Api) {
    $scope.itemtype = $routeParams.itemtype;
    $scope.itemid = $routeParams.itemid;
    
    $scope.items = [];
    $scope.pagination = {
      perPage: 10,
      currentPage: 1
    };
    $scope.init = function() {
      return Api['games'].list().then(function(res) {
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
        itemtype: 'games',
        item: item
      });
    };
    $scope["delete"] = function(item) {
      return modalManager.open('delete', {
        itemtype: 'games',
        item: item
      });
    };
    $scope.create = function() {
      return modalManager.open('create', {
        itemtype: 'games'
      });
    };
    $scope.showAchievements = function(item) {
        return modalManager.open('showAchievements', {
           itemtype: 'games',
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
]).controller('showAchievementsModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'Api', 'modalManager', 'modaldata', '$location', function($scope, $rootScope, $uibModalInstance, Api, modalManager, modaldata, $location) {
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
        
        $location.path('newAchievement/'+ $scope.item.Id);

        // return modalManager.open('addAchievement', {
        //   itemtype: $scope.itemtype,
        //   item: item
        // });
    };
    $scope.remove = function(item){
        Api['achievements'].delete($scope.item.Id).then(function(res) {
            $uibModalInstance.close();
            return modalManager.open('showAchievements', {
            itemtype: $scope.itemtype,
            item: $scope.item
            });
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
