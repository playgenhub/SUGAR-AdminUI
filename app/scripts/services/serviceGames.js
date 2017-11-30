// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc service
 * @name sgaAdminApp.Api
 * @description
 * # Api
 * Service in the sgaAdminApp.
 */
angular.module('sgaAdminApp').service('GamesApi', [
	'$http', 'config',
	function($http, config) {
		return {
			'games': {
				list: function() {
					return $http.get(config.api.baseurl + '/game/list');
				},
				get: function(id) {
					return $http.get(config.api.baseurl + '/game/findbyid/' + id);
				},
				getByName: function(name) {
					return $http.get(config.api.baseurl + '/game/find/' + name);
				},
				create: function(item) {
					return $http.post(config.api.baseurl + '/game', item);
        },
        update: function(id, item) {
					return $http.put(config.api.baseurl + '/game/update/' + id, item);
				},
				"delete": function(id) {
					return $http["delete"](config.api.baseurl + '/game/' + id);
				}
			},
			'data': {
				list: function(id) {
					return $http.get(config.api.baseurl + '/gamedata?gameId=' + id);
				},
				create: function(item) {
					return $http.post(config.api.baseurl + '/gamedata', item);
				},
				update: function(item) {
					return $http.put(config.api.baseurl + '/gamedata', item);
				}
      }
    };
	}
]);
