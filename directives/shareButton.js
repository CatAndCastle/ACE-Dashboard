ACE.directive('shareButton', function(){
	var controller = ['$scope', '$rootScope', 'ModalService', function ($scope, $rootScope, ModalService) {

		function shareFacebook() {
			console.log($rootScope.fbdata);

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
			        // $scope.customResult = "All good!";
			      });
			    });

	  //       }, {
	  //           scope: 'publish_actions,manage_pages,publish_pages', 
	  //           // scope: 'publish_pages', 
	  //           return_scopes: true
	  //       }); 

		}

		$scope.share = function () {

			if(!$scope.active){ return; }
			switch($scope.type){
				case 'facebook':
					shareFacebook();
					break;
				case 'twitter':
					console.log("share " + $scope.type);
					break;
				case 'email':
					console.log("share " + $scope.type);
					break;
				default:
					console.log("share " + $scope.type);
					break;
			}
	
	      
	  	};
	}],

	template = '<img ng-class="{clickable: active, active: active, zoomHover: active }" src="img/socialmedia/{{type}}Icon.png" ng-click="share()"/>';

	return {
		restrict: "EA",
		scope: {
			type: '@',
			storyid: '@',
			storyname: '@',
			active: '='
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