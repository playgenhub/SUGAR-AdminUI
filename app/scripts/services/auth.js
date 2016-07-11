// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc service
 * @name sgaAdminApp.Auth
 * @description
 * # Auth
 * Service in the sgaAdminApp.
 */
angular.module('sgaAdminApp')
	.factory('Auth', [
		'ipCookie',
		'config',
		function(ipCookie, config) {
			var Auth;
			Auth = {
				get: function(key) {
					var token;
					token = ipCookie(key);
					if (token != null) {
						return token;
					} else {
						return false;
					}
				},
				set: function(key, value) {
					return ipCookie(key, value, {
						expires: 60 * 60 * 24,
						expirationUnit: 'seconds',
						encode: function(value) {
							return value;
						}
					});
				},
				remove: function(key) {
					return ipCookie.remove(key);
				},
				preApproved: false,
				isAuthenticated: function() {
					var token;
					if (!Auth.preApproved) {
						token = ipCookie(config.tokens.authorization);
						Auth.preApproved = !!((token != null) && token.length);
					}
					return Auth.preApproved;
				}
			};
			return Auth;
		}
	]);
