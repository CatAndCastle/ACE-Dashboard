function ScriptController($scope, $window, $rootScope, $http, $timeout){

	$scope.edited = false;

	$scope.$on('storyData', function (event, data) {
		$scope.script = data.script;
		$scope.searchId = data.storyId;
	});

	// edit script
    $scope.didEdit = function(){
    	$scope.edited = true;
    }

    // save script edits
    $scope.saveEdits = function(){
    	$scope.$emit('updateScript', $scope.script);
    	$scope.edited = false;
    }
}