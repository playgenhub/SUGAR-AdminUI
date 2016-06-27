// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc service
  * @name sgaAdminApp.Api
  * @description
  * # Api
  * Service in the sgaAdminApp.
 */
angular.module('sgaAdminApp').service('Api', [
  '$http', 'config', function($http, config) {
    // return {
    //   'users': {
    //     list: function() {
    //       return $http.get(config.api.baseurl + '/user/all');
    //     },
    //     get: function(username){
    //         return $http.get(config.api.baseurl + '/user?name=' + username);
    //     },
    //     create: function(item) {
    //       return $http.post(config.api.baseurl + '/user', item);
    //     },
    //     update: function(id, item) {
    //       return $http.put(config.api.baseurl + "/user", item);
    //     },
    //     "delete": function(id) {
    //       return $http["delete"](config.api.baseurl + ("/user?Id=" + id));
    //     }
    //   },
    //   'groups': {
    //     list: function() {
    //       return $http.get(config.api.baseurl + '/group/all');
    //     },
    //     get: function(username) {
    //       return $http.get(config.api.baseurl + ("/group?name=" + username));
    //     },
    //     create: function(item) {
    //       return $http.post(config.api.baseurl + '/group', item);
    //     },
    //     update: function(id, item) {
    //       return $http.put(config.api.baseurl + "/group", item);
    //     },
    //     "delete": function(id) {
    //       return $http["delete"](config.api.baseurl + ("/group?Id=" + id));
    //     }
    //   },
    //   'achievements': {
    //       list: function(id){
    //           return $http.get(config.api.baseurl + '/groupachievement?gameId=' + id);
    //       },
    //       create: function(item) {
    //         return $http.post(config.api.baseurl + '/groupachievement', item);  
    //       },
    //       "delete": function(id){
    //           return $http["delete"](config.api.baseurl + '/groupachievement?Id=' + id);
    //       }
    //   },
    //   'games':{
    //       list: function(){
    //           return $http.get(config.api.baseurl + '/game/all')
    //       },
    //       create: function(item) {
    //         return $http.post(config.api.baseurl + '/game', item);  
    //       },
    //       "delete": function(id){
    //           return $http["delete"](config.api.baseurl + '/game?Id=' + id);
    //       }
    //   },
    //   'friends': {
    //     list: function(id) {
    //       return $http.get(config.api.baseurl + "/userfriend/friends?userId=" + id);
    //     },
    //     listPending: function(id){
    //       return $http.get(config.api.baseurl + ("/userfriend/sentrequests?userId=" + id));
    //     },
    //     get: function(id) {
    //       return $http.get(config.api.baseurl + ("/userfriend/" + id));
    //     },
    //     create: function(item){
    //       return $http.post(config.api.baseurl + '/userfriend', item)
    //     },
    //     update: function(item) {
    //       return $http.put(config.api.baseurl + "/userfriend", item);
    //     },
    //     "delete": function(id) {
    //       return $http["delete"](config.api.baseurl + ("/userfriend/" + id));
    //     }
    //   },
    //   'friendRequests':{
    //       list: function(id){
    //        return $http.get(config.api.baseurl + "/userfriend/requests?userId=" + id);   
    //       },
    //       update: function(item){
    //           return $http.put(config.api.baseurl + '/userfriend/request', item);
    //       }
    //   },
    //   'userGroups': {
    //     list: function(id) {
    //       return $http.get(config.api.baseurl + '/groupmember/usergroups?userId=' + id);
    //     },
    //     get: function(id) {
    //       return $http.get(config.api.baseurl + ("/groupmember/usergroups" + id));
    //     },
    //     update: function(item) {
    //       return $http.put(config.api.baseurl + "/groupmember", item);
    //     },
    //     "delete": function(item) {
    //       return $http["delete"](config.api.baseurl + "/groupmember", item );
    //     }
    //   },
    //   'members': {
    //     list: function(id) {
    //       return $http.get(config.api.baseurl + '/groupmember/members?groupId=' + id);
    //     },
    //     get: function(id) {
    //       return $http.get(config.api.baseurl + ("/groupmember/" + id));
    //     },
    //     create: function(item){
    //         return $http.post(config.api.baseurl + '/groupmember', item)
    //     },
    //     update: function(item) {
    //       return $http.put(config.api.baseurl + "/groupmember", item);
    //     },
    //     "delete": function(id) {
    //       return $http["delete"](config.api.baseurl + ("/groupmember/" + id));
    //     }
    //   }
    // };
  }
]);
