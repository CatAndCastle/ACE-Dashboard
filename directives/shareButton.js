ACE.directive('shareButton', function(){
	var controller = ['$scope', '$rootScope', 'ModalService', function ($scope, $rootScope, ModalService) {

		function shareFacebook() {
			console.log($rootScope.fbdata);

			switch($scope.sharetype){
				case 'video':
						// FB.login(function(response) {
		  //           // handle the response
		  //           var FB_ACCESS_TOKEN = response.authResponse.accessToken;
		  //           // console.log(FB_ACCESS_TOKEN);
		            ModalService.showModal({
						templateUrl: 'templates/facebookShare.html',
						controller: "FacebookShareController",
						inputs: {
							fb_token: $rootScope.fbdata.user.access_token,
							link: window.location.href,
							title: $scope.storyname,
							storyId: $scope.storyid
						}
				    }).then(function(modal) {
				      modal.close.then(function(result) {
				      	console.log("shared facbeook");
				      });
				    });

		  //       }, {
		  //           scope: 'publish_actions,manage_pages,publish_pages', 
		  //           // scope: 'publish_pages', 
		  //           return_scopes: true
		  //       }); 
					break;
				case 'link':
					FB.ui({
					  method: 'share',
					  href: $scope.sharelink,
					}, function(response){});
					break;
				default:
					FB.ui({
					  method: 'share',
					  href: $scope.sharelink,
					}, function(response){});
					break;


			}

			
		}

		function shareTwitter(){
			switch($scope.sharetype){
				case 'video':
					break;
				case 'link':
					window.open('http://twitter.com/share?url=' + $scope.sharelink, 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
					break;
				default:
					window.open('http://twitter.com/share?url=' + $scope.sharelink, 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
					break;
			}
		}

		$scope.share = function () {

			if(!$scope.active){ return; }
			switch($scope.platform){
				case 'facebook':
					shareFacebook();
					break;
				case 'twitter':
					shareTwitter();
					break;
				case 'email':
					console.log("share " + $scope.platform);
					break;
				case 'download':
					console.log("share " + $scope.platform);
					break;
				default:
					console.log("share " + $scope.platform);
					break;
			}
	
	      
	  	};

		$scope.imageSrc = function(){
			return 'img/share/'+$scope.platform+'Icon' + ($scope.style=='fill' ? '_filled' : '') + '.png';
		}
	}],

	

	template = '<img ng-class="{clickable: active, active: active, zoomHover: active }" '+
				// 'src="img/share/{{platform}}Icon'+(style=='fill' ? '_filled' : '') + '.png ' +
				'src="{{imageSrc()}}"' +
				'ng-click="share()"/>';

	return {
		restrict: "EA",
		scope: {
			style: '@', // fill?
			platform: '@',
			storyid: '@',
			storyname: '@',
			active: '=',
			sharetype: '@', // link, video
			sharelink: '@' // if sharetype==link
		},
		// link: function(scope, element, attrs) {
  //           scope.$watch('active', function(data) {
  //             scope.isActive = data;
  //           });
  //       },
		template: template,
		controller: controller
	}
});