// results controller
function AceResultsController($scope, $http, $timeout, $routeParams, $rootScope, $window) {

	var ctrl = this;

	$scope.searchId = $routeParams.searchId;

	$scope.aceReady = false;
	$scope.searchStatus = 0;
	$scope.data = {'name':'', storyId:$scope.searchId};
	
	
	$scope.videoBtnText = "Render Video";

	$scope.bodymovin = null;

	// TABLOIDSS HEHEHEHEHAHHA
	$scope.tab = 1;

    // EVENTS
    $scope.$on('updateAssets', function (event, assets) {
        $scope.data.assets = assets;
        saveEdits();
        propagateEdits();
    });

    $scope.$on('updateScript', function (event, script) {
        $scope.data.script = script;
        saveEdits();
        propagateEdits();
    });

    function propagateEdits(){
        prepareStory();
        $scope.$broadcast('storyDataChanged', $scope.data); // going down!
    }

    // save edits in database
    function saveEdits(){
        var postdata = $.param({ data: $scope.data, searchId: $scope.searchId });
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post(API_BASE+"ace/updateStory", postdata, config)
            .success(function (data, status, headers, config) {
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
                $window.alert('We are experiencing errors. Please try again later.');
            });
    }

    function prepareStory(){
        var body = [];
        
        for(var i=0; i<$scope.data.script.length; i++){
            if(i >= $scope.data.assets.length){continue;}

            var textAsset = $scope.data.script[i];
            var mediaAsset = $scope.data.assets[i];
            var imageUrl = "https://img.youtube.com/vi/"+mediaAsset.videoId+"/maxresdefault.jpg";
            var asset = {
                "id" : mediaAsset.videoId,
                "type" : "image", // "video", // use youtube poste images for now
                "text" : textAsset.text,
                "username" : "",
                "source" : "youtube",
                "images" : {
                    "thumbnail":{"width":480,"height":360, "url":imageUrl},
                    "low_resolution":{"width":480,"height":360, "url":imageUrl},
                    "standard_resolution":{"width":480,"height":360, "url":imageUrl}
                    },
                "videos" : {
                    "thumbnail":{"width":150,"height":150, "url":""},
                    "low_resolution":{"width":150,"height":150, "url":""},
                    "standard_resolution":{"width":150,"height":150, "url":""}
                    },
                "link" : mediaAsset.source

            };
            

            body.push(asset);
        }

        $scope.data.body = body;
    }
    
    $scope.setTab = function(newTab){
        $scope.tab = newTab;

        if(newTab == 2){
            $timeout(function(){
                $("textarea").each( function( index, element ){
                    $(this).height(this.scrollHeight );
                });
            },0);
        }
    };
    
    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };

    $scope.ready = function(){
    	return scope.aceReady();
    }

    $scope.$watch('data.script', function() {
    	console.log($scope.data);
    });

    $scope.print = function(){
    	console.log($scope.data);
    }

    // Check for ACE results
    function pollResults(){
        // alert("search " + $scope.searchText);

        // $http.get(API_BASE+"ace/searchResults?searchId="+$scope.searchId)
        $http.get(API_BASE+"story/"+$scope.searchId)
            .then(function(response){ 
            	// console.log(response);

            	if(response.status == 200){
	                response = response['data'];
	                $scope.searchStatus = response.status;
	                
	                if($scope.searchStatus == 1){
	                	$scope.aceReady = true;

	                	$scope.data = response; //.data;
	                	$scope.originalData = response.data;
	                	// $rootScope.story = response.data;

                        prepareStory();
                        $scope.$broadcast('storyData', $scope.data); // going down!

	                	// $("textarea").height( $("textarea")[0].scrollHeight );
	                }
	                // try again in 3 secs
	                else if($scope.searchStatus == 0){
	                	$timeout(function(){
				            pollResults();
				        },3000);
	                }
	                else if($scope.searchStatus == -1){
	                	$scope.searchStatusText = "DOES NOT EXIST";
	                	$location.path('/');
	                }
	            }
            });

        // send query to ACE, return search Id -> refirect to /search/:searchId
    }

    ctrl.$onInit = function() {
        pollResults();
    }; 

}