// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc service
 * @name sgaAdminApp.Api
 * @description
 * # Api
 * Service in the sgaAdminApp.
 */
angular.module('sgaAdminApp').service('LeaderboardsApi', [
	'$http', 'config',
	function($http, config) {
		return {
			'games': {
				list: function() {
					return $http.get(config.api.baseurl + '/game/list')
				},
				listFilters: function(id) {
					return $http.get(config.api.baseurl + 'NEEDS API CALL' + id)
				},
				get: function(id) {
					return $http.get(config.api.baseurl + '/game/findbyid/' + id);
				},
				create: function(item) {
					return $http.post(config.api.baseurl + '/game', item);
				},
				"delete": function(id) {
					return $http["delete"](config.api.baseurl + '/game/' + id);
				}
			},
			'user': {
				get: function(username) {
					return $http.get(config.api.baseurl + '/user/find/' + username);
				}
			},
			'leaderboard': {
				list: function(id) {
					return $http.get(config.api.baseurl + '/leaderboards/game/' + id + '/list');
				},
				getGlobal: function(){
					return $http.get(config.api.baseurl + '/leaderboards/global/list');
				},
				createFilter: function(item) {
					return $http.post(config.api.baseurl + '/leaderboards/create', item);
				},
				getConfig: function(token, gameId)
				{
					return $http.get(config.api.baseurl + '/leaderboards/' + token + "/" + gameId);
				},
				getLeaderboard: function(item) {
					return $http.post(config.api.baseurl + '/leaderboards/standings', item);
				},
				"delete": function(id) {
					return $http["delete"](config.api.baseurl + '/leaderboards/' + id);
				}
			}
		};
	}
]);
