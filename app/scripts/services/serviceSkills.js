// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc service
 * @name sgaAdminApp.Api
 * @description
 * # Api
 * Service in the sgaAdminApp.
 */
angular.module('sgaAdminApp').service('SkillsApi', [
	'$http', 'config',
	function($http, config) {
		return {
			'skills': {
				list: function() {
					return $http.get(config.api.baseurl + '/skills/list')
				},
				listSkills: function(id) {
					return $http.get(config.api.baseurl + '/skills/game/' + id + '/list');
				},
				globalSkills: function(id){
					return $http.get(config.api.baseurl + '/skills/global/list');
				},
				get: function(id) {
					return $http.get(config.api.baseurl + '/skills/game/' + id);
				},
				getByToken: function (gameId, token) {
					return $http.get(config.api.baseurl + '/skills/find/' + token + '/' + gameId);
				},
				createSkill: function(item) {
					return $http.post(config.api.baseurl + '/skills/create', item);
				},
				update: function(item) {
					return $http.put(config.api.baseurl + '/skills/update', item);
				},
				"delete": function(token, gameId) {
					return $http["delete"](config.api.baseurl + '/skills/' + token + '/' + gameId);
				},
				"deleteGlobal": function(token) {
					return $http["delete"](config.api.baseurl + '/skills/' + token + '/global');
				}
			},
			'games': {
				list: function() {
					return $http.get(config.api.baseurl + '/game/list')
				},
				get: function(id) {
					return $http.get(config.api.baseurl + '/game/findbyid/' + id);
				}
			},
			'user': {
				get: function(username) {
					return $http.get(config.api.baseurl + '/user/find/' + username);
				}
			}
		};
	}
]);
