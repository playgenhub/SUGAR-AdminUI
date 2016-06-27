// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc overview
  * @name sgaAdminApp
  * @description
  * # sgaAdminApp
  *
  * Main module of the application.
 */
angular.module('sgaAdminApp', ['ngAria', 'ngCookies', 'ngMessages', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ipCookie', 'ui.bootstrap']).config(function($routeProvider) {
  return $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    login: false
  }).when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    login: true
  }).when('/groups', {
    templateUrl: 'views/groups.html',
    controller: 'GroupsCtrl',
    login: true
  }).when('/groups/members/:itemtype/:itemId', {
    templateUrl: 'views/groupMembers.html',
    controller: 'GroupMembersCtrl',
    login: true
  }).when('/users', {
    templateUrl: 'views/users.html',
    controller: 'UsersCtrl',
    login: true
  }).when('/users/friends/:itemtype/:itemId', {
    templateUrl: 'views/userFriends.html',
    controller: 'UsersFriendsCtrl',
    login: true
  }).when('/users/groups/:itemtype/:itemId', {
    templateUrl: 'views/userGroups.html',
    controller: 'UsersGroupsCtrl',
    login: true
  }).when('/games', {
    templateUrl: 'views/games.html',
    controller: 'GamesCtrl',
    login: true
  }).when('/games/achievements/:itemtype/:itemId/new', {
    templateUrl: 'views/achievement.html',
    controller: 'AchievementCtrl',
    login: true
  }).when('/games/achievements/:itemtype/:itemId', {
    templateUrl: 'views/showAchievements.html',
    controller: 'showAchievementsCtrl',
    login: true
  }).when('/list/:itemtype', {
    templateUrl: 'views/list.html',
    controller: 'ListCtrl',
    login: true
  }).when('/list/:itemtype/:itemid', {
    templateUrl: 'views/list.html',
    controller: 'ListCtrl',
    login: true
  }).otherwise({
    redirectTo: '/'
  });
}).run([
  '$rootScope', '$location', '$route', 'Auth', 'config', function($rootScope, $location, $route, Auth, config) {
    return $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ((nextRoute != null) && nextRoute.login && !Auth.isAuthenticated()) {
        $location.search('return', $location.path());
        return $location.path('/login');
      }
    });
  }
]).constant('config', {
  api: {
    baseurl: window.location.protocol === "https:" ? 'https://localhost:62312/api' : 'http://localhost:62312/api'
  },
  headers: {
    session: "X-Http-Session"
  },
  tokens: {
    session: "SGAAdmin-Session"
  }
});
