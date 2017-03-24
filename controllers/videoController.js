function videoController($scope, $window, $rootScope, $http, $timeout){
	
	$scope.tab = 'preview';
	$scope.playing = false;
    $scope.rendering = false;
	$scope.showControls = false; // show controls after we fetch mp4 status info
	$scope.videoData = {'status':0};

	$scope.$on('storyData', function (event, data) {
		$scope.story = data;
		// check video status when first got story data
		pollVideoStatus();
	});
	$scope.$on('storyDataChanged', function (event, data) {
		$scope.story = data;
		if($scope.bodymovin){
			$scope.bodymovin.setData(clone(data));
			$scope.bodymovin.reset();
			// console.log(data);
		}
	});

	$scope.$on('playerStateChange', function (event, playing) {
        $scope.playing = playing;
        if(playing){
        	play();
        }    
    });

	$scope.isSet = function(tab){
		return $scope.tab == tab;
	}

	$scope.toggleView = function(tab){
		$scope.tab = tab;

		if(tab == 'mp4' && !$scope.rendering && $scope.videoData.status!=2){
			if ( window.confirm("start video render?") ) {
	            $scope.renderMp4();
	        }else{
	        	$scope.tab = 'preview';
	        }
		}
	}

	// JS PLayer
    function play(){
    	if(!$scope.bodymovin){
    		CONFIG = {
    			'api_url' : API_BASE,
    			'storyData': clone($scope.story),
    			'platform': 'browser',
    			'renderer': 'svg',
    			'language':'en'
    		}
    		$scope.bodymovin = new VideoConstructor(CONFIG);
    		advance($scope.bodymovin);
    	}else{
    		advance($scope.bodymovin);
    	}

    }

    function advance(constructor){
    	if(!$scope.playing){
    		return;
    	}
        var keepgoing = constructor.goToNextFrame();
        if(keepgoing){
            setTimeout(function(){
                advance(constructor);
            },50);
        }else{
        	// reset player
        	$scope.$broadcast('didEnd', true);
			$scope.bodymovin.setData(clone($scope.story));
			$scope.bodymovin.reset();
        }
    }

    // clone obj - when passing into bodymovin.
    function clone(obj){
    	return JSON.parse(JSON.stringify(obj));
    }


    /*
		Video Render Functions
    */
    $scope.renderMp4 = function(){

    	if($scope.rendering){
    		$window.alert("your video will be ready in a few minutes");
    		return;
    	}

    	var postdata = $.param({ storyId: $scope.story.storyId });
		var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
    	
    	$http.post(API_BASE+"zerobot/video/render", postdata, config)
	    	.success(function (data, status, headers, config) {
	    		$scope.rendering = true;
	    		$window.alert("your video is rendering");
                // $scope.showRenderBtn = true; // button fades back in
	            pollVideoStatus();
	        })
	        .error(function (data, status, header, config) {
                // $scope.showRenderBtn = true; // button fades back in
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
    	$http.get(API_BASE+"zerobot/video/status?storyId=" + $scope.story.storyId)
    		.then(function(response){ 
    			$scope.videoData = response.data;
            	if($scope.videoData.status == 1 || $scope.videoData.status == 0 ){
                    $scope.rendering = true;
            		$scope.videoBtnText = $scope.videoData.status==1 ? "...rendering..." : "...in queue...";
            		$timeout(function(){
				            pollVideoStatus();
				    },5000);
            	}
            	else if ($scope.videoData.status == 2 || $scope.videoData.status == -1){
            		$scope.rendering = false;
            	}
            	else if($scope.videoData.status == 3){
                    $scope.rendering = false;
            		$window.alert("there was an error rendeiring this video");
            	}
                $scope.showControls = true;
            });
    }


}