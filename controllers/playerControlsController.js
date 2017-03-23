function PlayerControlsController($scope, $window, $rootScope, $http){
	$scope.playing = false;
	
	$scope.play = function(val){
		$scope.playing = val;
		$scope.$emit('playerStateChange', val);
	}

	$scope.$on('didEnd', function (event, data) {
		$scope.playing = false;
		$scope.$apply();
	});
}