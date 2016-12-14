// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc function
 * @name sgaAdminApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('UsersProfileCtrl', [
	'$scope', '$stateParams', '$location', 'permissionService', 'modalManager', 'UsersApi',
	function($scope, $stateParams, $location, permissionService, modalManager, UsersApi) {
		$scope.itemtype = $stateParams.itemtype;
		$scope.itemId = $stateParams.itemId;

		$scope.permissionService = permissionService;

		$scope.hasDeleteUserPermission;

		$scope.hasGetFriendPermission;
		$scope.hasDeleteFriendPermission;

		$scope.hasGetFriendRequestPermission;
		$scope.hasCreateFriendRequestPermission;
		$scope.hasUpdateFriendRequestPermission;

		$scope.hasCreateGroupMemberPermission;
		$scope.hasDeleteGroupMemberPermission;

		$scope.hasCreateActorDataPermission;

		$scope.userFound = true;

		$scope.userName = '';

		$scope.items = [];
		$scope.pendings = [];
		$scope.requests = [];

		$scope.pagination = {
			perPage: 10,
			currentPage: 1
		};
		$scope.init = function() {

			// Our permissions
			$scope.hasDeleteUserPermission = permissionService.hasAccessToClaim('DeleteUser', $scope.itemId);

			$scope.hasGetFriendPermission = permissionService.hasAccessToClaim('GetUserFriendRequest', $scope.itemId);
			$scope.hasDeleteFriendPermission = permissionService.hasAccessToClaim('DeleteUserFriend', $scope.itemId);

			$scope.hasGetFriendRequestPermission = permissionService.hasAccessToClaim('GetUserFriendRequest', $scope.itemId);
			$scope.hasCreateFriendRequestPermission = permissionService.hasAccessToClaim('CreateUserFriendRequest', $scope.itemId);
			$scope.hasUpdateFriendRequestPermission = permissionService.hasAccessToClaim('UpdateUserFriendRequest', $scope.itemId);

			$scope.hasCreateGroupMemberPermission = permissionService.hasAccessToClaim('CreateGroupMemberRequest', $scope.itemId);
			$scope.hasDeleteGroupMemberPermission = true;

			$scope.hasCreateActorDataPermission = permissionService.hasAccessToClaim('CreateActorData', $scope.itemid);

			UsersApi['users'].getById($scope.itemId).then(function(res) {
				if (res.status === 200 && res.data['response'].name != null) {
					$scope.userName = res.data['response'].name;
					$scope.userFound = true;
				} else {
					$scope.userFound = false;
				}
			}).catch(function() {
				$scope.userFound = false;
			});
		};
		$scope.closeTable = function(){
			$scope.init();
		};

		$scope["delete"] = function(item) {
			return modalManager.open('deleteUser', {
				itemtype: 'users',
				userName: $scope.userName,
				itemId: $scope.itemId
			});
		};

		$scope.back = function() {
			//go back to users list
			$location.path("/users");
		};

		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});

	}
]).controller('addFriendModalCtrl', [
	'$scope', '$rootScope', '$uibModalInstance', 'UsersApi', 'modalManager', 'modaldata',
	function($scope, $rootScope, $uibModalInstance, UsersApi, modalManager, modaldata) {
		$scope.userName = modaldata.userName;
		$scope.config = modaldata.config;
		$scope.itemId = modaldata.itemId;

		$scope.exists = true;

		if (modaldata.item != null) {
			$scope.item = modaldata.item;
		} else if (modaldata.itemid != null) {
			UsersApi[$scope.itemtype].get(modaldata.itemid).then(function(data) {
				if ((data != null ? data.data : void 0) != null) {
					return $scope.item = data.data;
				}
			});
		}

		//our buttons
		$scope.closeModal = function() {
			$scope.exists = true;
			$uibModalInstance.close();
		};
		$scope.add = function(item) {
			UsersApi['users'].get($scope.txtBox)

			.then(function(res) {
				if (res.data['response'][0] != null) {
					//put the data backwards for testing as groups cannot request users join
					var friendship = "{ RequestorId: " + $scope.itemId + ", AcceptorId: " + res.data['response'][0].id + " }"
					UsersApi['friends'].create(friendship)

					.then(function(res) {
						$uibModalInstance.close();
						$rootScope.$broadcast('savedItem')
					});
				} else
					$scope.exists = false;
			});
		};
	}
]).controller('addGroupModalCtrl', [
	'$scope', '$rootScope', '$uibModalInstance', 'UsersApi', 'modalManager', 'modaldata',
	function($scope, $rootScope, $uibModalInstance, UsersApi, modalManager, modaldata) {
		$scope.itemtype = modaldata.itemtype;
		$scope.config = modaldata.config;
		$scope.itemId = modaldata.itemId;
		$scope.exists = true;

		if (modaldata.item != null) {
			$scope.item = modaldata.item;
		} else if (modaldata.itemid != null) {
			UsersApi[$scope.itemtype].get(modaldata.itemid).then(function(data) {
				if ((data != null ? data.data : void 0) != null) {
					return $scope.item = data.data;
				}
			});
		}

		//our buttons
		$scope.closeModal = function() {
			$scope.exists = true;
			return $uibModalInstance.close();
		};

		$scope.add = function(item) {
			UsersApi['userGroups'].getGroup($scope.txtBox)

			.then(function(res) {
				if (res.data['response'][0] != null) {
					//put the data backwards for testing as groups cannot request users join
					var friendship = "{ RequestorId: " + $scope.itemId + ", AcceptorId: " + res.data['response'][0].id + ", AutoAccept: true }"
					UsersApi['userGroups'].createMember(friendship).then(function(res) {
						$uibModalInstance.close();
						$rootScope.$broadcast('savedItem');
					});

				} else
					$scope.exists = false;
			});
		};
	}
]).controller('ConfirmDeleteUserModalCtrl', [
	'$scope', '$rootScope', '$location', '$uibModalInstance', 'UsersApi', 'modaldata',
	function($scope, $rootScope, $location, $uibModalInstance, UsersApi, modaldata) {
		$scope.itemtype = modaldata.itemtype;
		$scope.userName = modaldata.userName;
		$scope.itemId = modaldata.itemId;

		if (modaldata.item != null) {
			$scope.item = modaldata.item;
		} else if (modaldata.itemid != null) {
			$scope.item = {};
			usersApi[$scope.itemtype].get(modaldata.itemid).then(function(data) {
				return console.log(data);
			});
		}
		$scope["delete"] = function() {
			return UsersApi[$scope.itemtype]["delete"]($scope.itemId).then(function() {
				$uibModalInstance.close();
				$location.path("/users");
			});
		};
		return $scope.close = function() {
			return $uibModalInstance.close();
		};
	}
]);


