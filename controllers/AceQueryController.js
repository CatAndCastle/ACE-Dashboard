// HOME PAGE
ACE.controller('AceQueryController', function($scope, $http, $timeout, $location) {
    var ctrl = this;
    $scope.searchText = "";

    $scope.search = function(){
        // alert("search " + $scope.searchText);

        $http.get(API_BASE+"ace/search?q="+$scope.searchText)
            .then(function(response){ 
                console.log(response);
                $location.path('/search/'+response.data.searchId);
            });

        // send query to ACE, return search Id -> refirect to /search/:searchId
    }


});