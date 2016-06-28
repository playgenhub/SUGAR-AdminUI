// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc service
  * @name sgaAdminApp.Api
  * @description
  * # Api
  * Service in the sgaAdminApp.
 */
angular.module('sgaAdminApp').service('GroupsApi', [
  '$http', 'config', function($http, config) {
    return {
      'groups': {
        list: function() {
          return $http.get(config.api.baseurl + '/group/list');
        },
        get: function(username) {
          return $http.get(config.api.baseurl + ("/group/find/" + username));
        },
        getById: function(id) {
          return $http.get(config.api.baseurl + ("/group/findbyid/" + id));
        },
        create: function(item) {
          return $http.post(config.api.baseurl + '/group', item);
        },
        update: function(id, item) {
          return $http.put(config.api.baseurl + "/group", item);
        },
        "delete": function(id) {
          return $http["delete"](config.api.baseurl + ("/group/" + id));
        }
      },
      'members': {
        list: function(id) {
          return $http.get(config.api.baseurl + '/groupmember/members/' + id);
        },
        get: function(id) {
          return $http.get(config.api.baseurl + ("/groupmember/" + id));
        },
        create: function(item){
            return $http.post(config.api.baseurl + '/groupmember', item)
        },
        update: function(item) {
          return $http.put(config.api.baseurl + "/groupmember", item);
        },
        "delete": function(id) {
          return $http["delete"](config.api.baseurl + ("/groupmember/" + id));
        }
      },
      'user': {
        get: function(username){
            return $http.get(config.api.baseurl + '/user/find/' + username);
        }
      }
    };
  }
]);