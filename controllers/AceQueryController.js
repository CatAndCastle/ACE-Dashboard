// HOME PAGE
ACE.controller('AceQueryController', function($scope, $http, $timeout, $location) {
    var ctrl = this;
    $scope.searchText = "";

    // fetch suggested search queries on init
    getSuggestions();

    $scope.search = function(q){
        
        $http.get(API_BASE+"ace/search?q="+q)
            .then(function(response){ 
                console.log(response);
                $location.path('/search/'+response.data.searchId);
            });

    }

    function getSuggestions(){
        $http.get(API_BASE+"ace/recentSearch")
            .then(function(response){ 
                $scope.queries = response.data;
            });
    }

});