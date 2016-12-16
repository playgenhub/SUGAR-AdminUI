// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc function
 * @name sgaAdminApp.controller:GroupsProfileCtrl
 * @description
 * # UsersCtrl
 * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('GroupsProfileCtrl', [
	'$rootScope', '$scope', '$stateParams', '$state', '$location', 'permissionService', 'modalManager', 'GroupsApi',
	function($rootScope, $scope, $stateParams, $state, $location, permissionService, modalManager, GroupsApi) {
		$scope.itemtype = $stateParams.itemtype;
		$scope.itemId = $stateParams.itemId;

		$scope.permissionService = permissionService;

		$scope.hasDeletePermission;
		$scope.hasEditPermission;

		$scope.hasGetMemberPermission;
		$scope.hasCreateMemberPermission;
		$scope.hasDeleteMemberPermission;

		$scope.hasGetRolePermission;
		$scope.hasCreateRolePermission;
		$scope.hasUpdateRolePermission;

		$scope.hasGetActorDataPermission;
		$scope.hasCreateActorDataPermission;

		$scope.hasGetActorDetailsPermission;
		$scope.hasCreateActorDetailsPermission;

		$scope.groupName = '';
		$scope.groupFound = true;

		$scope.items = [];
		$scope.pagination = {
			perPage: 10,
			currentPage: 1
		};
		$scope.init = function() {
			// our permissions
			$scope.getPermissions();


			GroupsApi['members'].list($scope.itemId).then(function(res) {
				if ((res != null ? res.status : void 0) === 200 && (res.data != null)) {
					$scope.items = res.data['response'];
				}
			});
			GroupsApi['groups'].getById($scope.itemId).then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.groupName = res.data['response'].name;
				} else {
					$scope.groupFound = false;
				}
			}).catch(function() {
				$scope.groupFound = false;
			});
		};
		$scope["delete"] = function(item) {
			return modalManager.open('deleteGroup', {
				itemtype: 'groups',
				groupName: $scope.groupName,
				itemId: $scope.itemId
			});
		};
		//our buttons
		$scope.remove = function(item) {
			var friendship = "{ RequestorId: " + item.id + ", AcceptorId: " + $scope.itemId + ", Accepted: false }"
			GroupsApi['members'].update(friendship).then(function(res) {
				$scope.init();
			});
		};
		$scope.add = function(item) {
			return modalManager.open('addMember', {
				itemtype: $scope.itemtype,
				itemId: $scope.itemId
			});
		};
		$scope.back = function() {
			//go back to group list
			$location.path("/groups");
		};

		$scope.getPermissions = function() {
			$scope.hasDeletePermission = permissionService.hasAccessToClaim('DeleteGroup', $scope.itemId);
			$scope.hasUpdatePermission = permissionService.hasAccessToClaim('UpdateGroup', $scope.itemId);

			$scope.hasGetMemberPermission = true;
			$scope.hasCreateMemberPermission = permissionService.hasAccessToClaim('CreateGroupMemberRequest', $scope.itemId);
			$scope.hasDeleteMemberPermission = permissionService.hasAccessToClaim('DeleteGroupMember', $scope.itemId);

			$scope.hasGetRolePermission = permissionService.hasAccessToClaim('GetRole', $scope.itemId);
			$scope.hasCreateRolePermission = permissionService.hasAccessToClaim('CreateRole', $scope.itemId);
			$scope.hasUpdateRolePermission = true;//permissionService.hasAccessToClaim('UpdateRole', $scope.itemId);

			$scope.hasGetActorDataPermission = permissionService.hasAccessToClaim('GetActorData', $scope.itemid);
			$scope.hasCreateActorDataPermission = permissionService.hasAccessToClaim('CreateActorData', $scope.itemid);

			$scope.hasGetActorDetailsPermission = permissionService.hasAccessToClaim('GetActorDetail', $scope.itemId);
			$scope.hasCreateActorDetailsPermission = permissionService.hasAccessToClaim('CreateActorDetail', $scope.itemid);

			$rootScope.$emit('permissionsSet');
			$rootScope.$broadcast('permissionsSetBroadcast');
			
		};


		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});
		return $scope.$on('refreshPermissions', function(event, args) {
			return $scope.getPermissions();
		});

	}
]).controller('addMemberModalCtrl', [
	'$scope', '$rootScope', '$uibModalInstance', 'GroupsApi', 'modalManager', 'modaldata',
	function($scope, $rootScope, $uibModalInstance, GroupsApi, modalManager, modaldata) {
		$scope.groupName = modaldata.groupName;
		$scope.itemId = modaldata.itemId;

		$scope.exists = true;

		if (modaldata.item != null) {
			$scope.item = modaldata.item;
		} else if (modaldata.itemid != null) {
			GroupsApi[$scope.itemtype].get(modaldata.itemid).then(function(data) {
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
			GroupsApi['user'].get($scope.txtBox)

			.then(function(res) {
				if (res.data['response'][0] != null) {
					//put the data backwards for testing as groups cannot request users join
					var friendship = "{ RequestorId: " + res.data['response'][0].id + ", AcceptorId: " + $scope.itemId + ", AutoAccept: true }"
					GroupsApi['members'].create(friendship)

					.then(function(res) {
						$uibModalInstance.close();
						$rootScope.$broadcast('savedItem')
					});
				} else
					$scope.exists = false;
			});
		};
	}
]).controller('ConfirmDeleteGroupModalCtrl', [
	'$scope', '$rootScope', '$location', '$uibModalInstance', 'GroupsApi', 'modaldata',
	function($scope, $rootScope, $location, $uibModalInstance, GroupsApi, modaldata) {
		$scope.itemtype = modaldata.itemtype;
		$scope.groupName = modaldata.groupName;
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
			return GroupsApi[$scope.itemtype]["delete"]($scope.itemId).then(function() {
				$uibModalInstance.close();
				$location.path("/groups");
			});
		};
		return $scope.closeModal = function() {
			return $uibModalInstance.close();
		};
	}
]).controller('AddRoleModalCtrl', [
	'$scope', '$rootScope', '$uibModalInstance', 'UsersApi', 'RolesApi', 'modalManager', 'modaldata',
	function($scope, $rootScope, $uibModalInstance, UsersApi, RolesApi, modalManager, modaldata) {
		$scope.gameId = modaldata.gameId;
		$scope.roleId = modaldata.roleId;
		
		$scope.exists = true;

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
					var userRole = "{ ActorId: " + res.data['response'][0].id + ", roleId: " + $scope.roleId + ", EntityId: " + $scope.gameId + " }"
					RolesApi['updateRoles'].CreateActorRole(userRole)

					.then(function(res) {
						$uibModalInstance.close();
						$rootScope.$broadcast('UpdatedRoles')
					});
				} else
					$scope.exists = false;
			});
		};
	}
]);


