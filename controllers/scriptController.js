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

    //delete line
    $scope.deleteLine = function(idx){
        console.log("delete "  + idx);
        if ( window.confirm("delete asset?") ) {
            $scope.script.splice(idx,1);
            $scope.edited = true;
            // recordChanges();
        }
    }

    //add line
    $scope.addLine = function(){
        $scope.script.push({
            'source':'Enter source',
            'text': 'Enter text'
        });
        $scope.edited = true;
    }

    function recordChanges(){
        $scope.$emit('updateScript', $scope.script);
        $scope.edited = false;
    }
}