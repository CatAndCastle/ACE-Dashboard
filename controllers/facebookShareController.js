ACE.controller('FacebookShareController', ['$scope', '$routeParams', '$http', '$timeout', '$window', 'fb_token', 'link', 'title', 'storyId', 'close', 
	function($scope, $routeParams, $http, $timeout, $window, fb_token, link, title, storyId, close) {

 	$scope.posterImg = 'https://s3.amazonaws.com/video.zeroslant.com/'+storyId+'/poster.jpg';
 	$scope.fb_token = fb_token;
 	$scope.storyId = storyId;
 	$scope.link = link;
 	$scope.title = title;
 	$scope.close = close;
 	$scope.autocompleteList = [];
 	$scope.user = [];
    $scope.managedPages = [];
    $scope.showUserDropdown  = false;
    $scope.selectedAccount = {'access_token': $scope.fb_token};

    // console.log($scope.selectedAccount);
 	
 	var ctrl = this;
 	ctrl.textarea = $(".body input");
 	ctrl.tagging = false;
 	ctrl.tagIdx = 0;
 	ctrl.pageIds = [];

 	getUserAccounts();

 	$scope.posterUrl = function (){
 		return $scope.posterImg;
 	}

 	$scope.post = function(){
 		// replace page mentions with Ids
 		var txt  = $scope.postText;
 		for(var key in ctrl.pageIds){
 			txt = txt.replace(key, ctrl.pageIds[key]);
 		}
 		txt = txt.split("[").join("@[");

 		var data = {
 			'fb_token'	: $scope.selectedAccount.access_token,
 			'storyId'	: $scope.storyId,
 			'text'		: txt,
 			'link'		: $scope.link,
 			'poster'	: $scope.posterImg,
 			'title' 	: $scope.title
 		};
 		// console.log(data);


 		var postdata = $.param(data);
		var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
		$http.post(API_BASE+"web/postFacebookVideo", postdata, config)
		.success(function (data, status, headers, config) {
            // console.log(data);
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
            $window.alert('We are experiencing errors. Please try again later.');
        });

        $timeout(function(){
			close();	
        }, 500);
        

 	}

 	$scope.showDropdown = function(){
		return $scope.autocompleteList.length > 0;
	}

	$scope.showAccounts = function(){
		$scope.showUserDropdown  = true;
	}

	$scope.selectAccount = function(data){
		$scope.selectedAccount = data;
		$scope.showUserDropdown  = false;
	}

	$scope.selectTag = function(data){		
		ctrl.tagging = false;
		$scope.autocompleteList =[];
		ctrl.pageIds[data.name] = data.id;

		var txt = $scope.postText;
		var startIdx = ctrl.tagIdx;
		var endIdx = $(".body .input")[0].selectionStart;

		// $scope.postText = txt.slice(0, startIdx-1) + " <span class='tag'>"+data.name+"</span>" + txt.slice(endIdx);
		$scope.postText = txt.slice(0, Math.max(startIdx-1,0)) + " ["+data.name+"] " + txt.slice(endIdx);
		
	}	

 	$scope.handleKeypress = function(keyEvent){

		if(keyEvent.which === 64) // 64 => @
		{
			ctrl.tagging = true;
			ctrl.tagIdx = $(".body .input")[0].selectionStart;

		}else if(ctrl.tagging)
		{
			var value = $scope.postText.substring(ctrl.tagIdx) + keyEvent.key;
			$timeout(function () {
				if (value == $scope.postText.substring(ctrl.tagIdx) && ctrl.tagging){
					searchPages(value); 
				}else{
					// console.log(value + " canged to " + $scope.postText.substring(ctrl.tagIdx));
				}
			},500, value);
		}
	}
	
	

	function searchPages(q){
		// console.log("searching " + q);
		$http.get(API_BASE+"fb/search?q=" + q)
		.success(function (data, status, headers, config) {
            $scope.autocompleteList = data;
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
            $window.alert('We are experiencing errors. Please try again later.');
        });
	}

	function getUserAccounts(){
		$http.get(API_BASE+"fb/accounts?fb_token=" + $scope.fb_token)
		.success(function (data, status, headers, config) {
            $scope.user = data.user;
            $scope.selectedAccount = data.user;
            $scope.managedPages = data.managed_pages;
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
            $window.alert('We are experiencing errors. Please try again later.');
        });

	}

}]);