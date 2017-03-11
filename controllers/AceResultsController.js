// results controller
ACE.controller('AceResultsController', function($scope, $http, $timeout, $routeParams, $location) {

	var ctrl = this;

	$scope.searchId = $routeParams.searchId;
	console.log("search " + $scope.searchId);
	$scope.searchStatusText = "SEARCHING";
	$scope.searchStatus = 0;
	$scope.data = {'name':'SEARCHING', storyId:$scope.searchId};
	
	$scope.videoData = {'status':0};
	$scope.videoBtnText = "Render Video";

	// TABLOIDSS HEHEHEHEHAHHA
	$scope.tab = 1;
    
    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };
    
    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };


    // Check for ACE results
    function pollResults(){
        // alert("search " + $scope.searchText);

        $http.get(API_BASE+"ace/searchResults?searchId="+$scope.searchId)
            .then(function(response){ 
            	console.log(response);

            	if(response.status == 200){
	                response = response['data'];
	                $scope.searchStatus = response.status;
	                
	                if($scope.searchStatus == 1){
	                	$scope.searchStatusText = "READY: ";
	                	$scope.data = response.data;

	                	$("textarea").height( $("textarea")[0].scrollHeight );
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
        pollVideoStatus();
    }; 

    // check for video resluts

    $scope.startRender = function(){
    	// push story to render queue

    	var postdata = $.param({ storyId: $scope.searchId });
		var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
    	
    	$http.post(API_BASE+"zerobot/video/render", postdata, config)
	    	.success(function (data, status, headers, config) {
	            pollVideoStatus();
	        })
	        .error(function (data, status, header, config) {
	            $scope.ResponseDetails = "Data: " + data +
	                "<hr />status: " + status +
	                "<hr />headers: " + header +
	                "<hr />config: " + config;
	            $window.alert('We are experiencing errors. Please try again later.');
	        });
    }

    $scope.videoReady = function(){
    	return $scope.videoData.status==2;
    }

    function pollVideoStatus(){
    	$http.get(API_BASE+"zerobot/video/status?storyId=" + $scope.searchId)
    		.then(function(response){ 
    			$scope.videoData = response.data;
            	if($scope.videoData.status == 1 || $scope.videoData.status == 0 ){
            		$scope.videoBtnText = $scope.videoData.status==1 ? "...rendering..." : "...in queue...";
            		$timeout(function(){
				            pollVideoStatus();
				    },5000);
            	}
            });
    }

});