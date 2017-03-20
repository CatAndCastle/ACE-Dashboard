function SideBarController($scope, $window, $http, $rootScope){
	var ctrl = this;

	ctrl.$onInit = function(){

		// when FB script loads - check login status
		window.fbAsyncInit = function() {

			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					// the user is logged in and has authenticated your
					// app, and response.authResponse supplies
					// the user's ID, a valid access token, a signed
					// request, and the time the access token 
					// and signed request each expire
					var uid = response.authResponse.userID;

					// var accessToken = response.authResponse.accessToken;
					// console.log("LOGGED IN!");
					// console.log(accessToken);

					$scope.fb_token = response.authResponse.accessToken;
					getUserData();

				} else if (response.status === 'not_authorized') {
					// the user is logged in to Facebook, 
					// but has not authenticated your app
				} else {
					// the user isn't logged in to Facebook.
				}
			});
		}
	}

	$scope.logout = function(){
		alert("HEEEELL NO");
	}

	function getUserData(){
		$http.get(API_BASE+"fb/accounts?fb_token=" + $scope.fb_token)
		.success(function (data, status, headers, config) {
            $scope.user = data.user;
            $scope.selectedAccount = data.user;
            $scope.managedPages = data.managed_pages;


            $rootScope.fbdata = data;
            console.log(data);
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
            $window.alert('We are experiencing errors. Please try again later.');
        });

	}
}