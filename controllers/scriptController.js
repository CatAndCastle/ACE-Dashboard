function ScriptController($scope, $window, $rootScope, $http, $timeout){

	$scope.edited = false;

	$scope.$on('storyData', function (event, data) {
		$scope.script = data.script;
		$scope.searchId = data.storyId;
        $scope.story = data;
	});

	// edit script
    $scope.didEdit = function(){
    	$scope.edited = true;
    }

    // save script edits
    $scope.saveEdits = function(){
        // extract source for new sentences
        for(var i=0; i<$scope.script.length; i++){
            if($scope.script[i].new){
                delete $scope.script[i]["new"];
                $scope.script[i]['source'] = extractDomain($scope.script[i]['url']);
            }
        }

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
            'source':'',
            'url': '',
            'text': 'Enter text',
            'new': true
        });
        $scope.edited = true;
    }

    function extractDomain(url) {
        if(url.length < 1){return url;}
        var domain;
        //find & remove protocol (http, ftp, etc.) and get domain
        if (url.indexOf("://") > -1) {
            domain = url.split('/')[2];
        }
        else {
            domain = url.split('/')[0];
        }

        //find & remove port number
        domain = domain.split(':')[0];
        //find & remove www
        if (url.indexOf("www.") > -1) {
            domain = domain.split('www.')[1];
        }

        return domain;
    }


    function recordChanges(){
        $scope.$emit('updateScript', $scope.script);
        $scope.edited = false;
    }
}