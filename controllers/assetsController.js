function AssetsController($scope, $window, $rootScope, $http, ModalService){

	$scope.$on('storyData', function (event, data) {
		$scope.assets = data.assets; // 'Some data'
	});

	$scope.addAsset = function(){
		ModalService.showModal({
			templateUrl: 'templates/addAsset.html',
			controller: "AddAssetController",
	    }).then(function(modal) {
	      modal.close.then(function(link) {
	      	if(link!=null){
		      	var youtubeId = parseYoutubeId(link);
		      	if(youtubeId!=false){
			      	$scope.assets.push({
			      		'videoId': youtubeId,
			      		'source': 'https://www.youtube.com/watch?v='+youtubeId,
			      		'embed': 'https://www.youtube.com/embed/'+youtubeId+'?rel=0',
			      		'platform': 'youtube',
			      		'type': 'video'
			      	});

			      	recordChanges();
			    }
		    }

	      });
	    });

	    
	}

	function parseYoutubeId(url){
	    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	    var match = url.match(regExp);
	    return (match&&match[7].length==11)? match[7] : false;
	}

	$scope.deleteAsset = function(idx){
		console.log("delete "  + idx);
		if ( window.confirm("delete asset?") ) {
            $scope.assets.splice(idx,1);
			recordChanges();
        }
	}

	function recordChanges(){
		$scope.$emit('updateAssets', $scope.assets);
	}

}