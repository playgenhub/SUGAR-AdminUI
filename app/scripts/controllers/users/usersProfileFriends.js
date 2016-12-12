angular.module('sgaAdminApp').controller('UsersProfileFriendsCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'UsersApi',
	function($scope, $stateParams, $location, modalManager, UsersApi) {

		$scope.ShowingFriends = true;
		$scope.ShowingPendingRequests = false;
		$scope.ShowingIncomingRequests = false;

		$scope.init = function() {
			$scope.items = [];
			$scope.friends = [];
			$scope.pendings = [];
			$scope.requests = [];

			$scope.pagination = {
				perPage: 10,
				currentPage: 1
			};

			UsersApi['friendRequests'].listRequests($scope.itemId).then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.requests = res.data['response'];
					if ($scope.ShowingIncomingRequests)
					{
						$scope.items = $scope.requests;
					}
				}
			});
			UsersApi['friendRequests'].listSentRequests($scope.itemId).then(function(res) {
				if (res != null && res.data != null) {
					$scope.pendings = res.data['response'];
					if ($scope.ShowingPendingRequests)
					{
						$scope.items = $scope.pendings;
					}
				}
			});

			UsersApi['friends'].list($scope.itemId).then(function(res) {
				if ((res != null ? res.status : void 0) === 200 && (res.data['response'].length > 0)) {
					$scope.friends = res.data['response'];
					if ($scope.ShowingFriends)
					{
						$scope.items = $scope.friends;
					}
				}
			});

		};
		$scope.addFriend = function(item) {
			return modalManager.open('addFriend', {
				userName: $scope.userName,
				itemId: $scope.itemId,
				item: item
			});
		};
		$scope.viewIncoming = function() {
			$scope.reset();
			$scope.ShowingIncomingRequests = true;

			$scope.items = $scope.requests;
		};
		$scope.viewPending = function() {
			$scope.reset();
			$scope.ShowingPendingRequests = true;

			$scope.items = $scope.pendings;
		};
		$scope.viewFriends = function() {
			$scope.reset();
			$scope.ShowingFriends = true;

			$scope.items = $scope.friends;
		};

		$scope.reset = function () {
			$scope.items = [];

			$scope.ShowingFriends = false;
			$scope.ShowingPendingRequests = false;
			$scope.ShowingIncomingRequests = false;
		};
		$scope.remove = function(item) {
            var friendship = "{ RequestorId: " + item.id + ", AcceptorId: " + $scope.itemId + ", Accepted: false }";
            UsersApi['friends'].update(friendship).then(function(res) {
                $scope.init();
        	});
		};

        $scope.removePending = function(item) {
            var friendship = "{ RequestorId: " + $scope.itemId + ", AcceptorId: " + item.id + ", Accepted: false }";
            UsersApi['friendRequests'].update(friendship).then(function(res) {
                $scope.init();
            });
        };

		$scope.accept = function(item) {
            var friendship = "{ RequestorId: " + item.id + ", AcceptorId: " + $scope.itemId + ", Accepted: true }";
            UsersApi["friendRequests"].update(friendship).then(function(res) {
                $scope.init();
            });
        };
        $scope.reject = function(item) {
            var friendship = "{ RequestorId: " + itemId + ", AcceptorId: " + $scope.itemId + ", Accepted: false }";
            UsersApi["friendRequests"].update(friendship).then(function(res) {
                $scope.init();
            });
        };


		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});
	}
]);