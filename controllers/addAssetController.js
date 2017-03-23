ACE.controller('AddAssetController', ['$scope', 'close', function($scope, close){

	$scope.close = function(result) {
	 	close(result); // close, but give 500ms for bootstrap to animate
	};

	$scope.stopPropagation = function ($event) {
	  	$event.stopPropagation();
	};

	$scope.handleKeyUp = function(keyEvent){
		if (keyEvent.which === 13){
		    close($scope.link);
		}
	}

}]);