/***********************************************
Share page link to social media
************************************************/

function ShareButtonsController($scope, $window, $attrs, $element, ModalService){
	var ctrl = this;
	$scope.clickedIn = false;

	$scope.open = function(){
		$scope.clickedIn = true;
	}

	// $scope.shareFacebook = function(){
	// 	FB.ui(
	// 	 {
	// 	  method: 'share',
	// 	  href: window.location.href
	// 	}, function(response){});
	// }
	$scope.shareTwitter = function(){
		var url = window.location.href;
		var title  = encodeURIComponent("I discovered '"+ $attrs.storyname +"' on Zero Slant. Check it out!");
		window.open('http://twitter.com/share?url=' + ctrl.link + '&text=' + title + '&', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
	}
	$scope.shareLink = function(){
		var text  = encodeURIComponent("I discovered '"+ $attrs.storyname +"' on Zero Slant. Check it out! " + ctrl.link);
		var href = "mailto:?subject="+ $attrs.storyname +"&body="+text;
		window.location.href = href;
	}

	ctrl.$onInit = function() {
	    // Set a default fieldType
	    if (!ctrl.link) {
	      ctrl.link = window.location.href;
	    }
	    // console.log('share link: ' + this.link);
	};

	$scope.shareFacebook = function() {
		FB.login(function(response) {
            // handle the response
            var FB_ACCESS_TOKEN = response.authResponse.accessToken;
            // console.log(FB_ACCESS_TOKEN);
            ModalService.showModal({
				templateUrl: 'templates/facebookShare.html',
				controller: "FacebookShareController",
				inputs: {
					fb_token: FB_ACCESS_TOKEN,
					link: window.location.href,
					title: $attrs.storyname,
					storyId: $attrs.storyid
				}
		    }).then(function(modal) {
		      modal.close.then(function(result) {
		      	console.log("all good");
		        // $scope.customResult = "All good!";
		      });
		    });

        }, {
            scope: 'publish_actions,manage_pages,publish_pages', 
            // scope: 'publish_pages', 
            return_scopes: true
        }); 

	};
}
