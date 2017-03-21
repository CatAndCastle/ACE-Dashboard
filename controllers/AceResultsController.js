// results controller
ACE.controller('AceResultsController', function($scope, $http, $timeout, $routeParams, $location) {

	var ctrl = this;

	$scope.searchId = $routeParams.searchId;

	$scope.aceReady = false;
	$scope.searchStatus = 0;
	$scope.data = {'name':'', storyId:$scope.searchId};
	$scope.edited = false;
	
	$scope.videoData = {'status':0};
	$scope.videoBtnText = "Render Video";

	$scope.bodymovin = null;

	// TABLOIDSS HEHEHEHEHAHHA
	$scope.tab = 1;
    
    $scope.setTab = function(newTab){
      $scope.tab = newTab;
      if(newTab == 4){
      	initPlayer();
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

    // edit script
    $scope.didEdit = function(){
    	$scope.edited = true;
    }

    // save script edits
    $scope.saveEdits = function(){
    	$scope.edited = false;

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

    // Check for ACE results
    function pollResults(){
        // alert("search " + $scope.searchText);

        $http.get(API_BASE+"ace/searchResults?searchId="+$scope.searchId)
            .then(function(response){ 
            	// console.log(response);

            	if(response.status == 200){
	                response = response['data'];
	                $scope.searchStatus = response.status;
	                
	                if($scope.searchStatus == 1){
	                	$scope.aceReady = true;

	                	$scope.data = response.data;
	                	$scope.originalData = response.data;

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


    // JS PLayer
    function initPlayer(){
    	if(!$scope.bodymovin){
    		CONFIG = {
    			'storyId': $scope.searchId,
    			'platform': 'phantom',
    			'renderer': 'svg'
    		}
    		$scope.bodymovin = new VideoConstructor(CONFIG);
    		advance($scope.bodymovin);
    	}

    }

    function advance(constructor){
        var keepgoing = constructor.goToNextFrame();
        if(keepgoing){
            setTimeout(function(){
                advance(constructor);
            },50);
        }
    }

});