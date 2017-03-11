// var prefix = '/ACE/dashboard/';
var ACE = angular.module('ace-dashboard', ['ngRoute', 'angularModalService']);

ACE.config(function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'templates/aceQuery.html',
            controller: 'AceQueryController'
        }).
        when('/search/:searchId', {
            templateUrl: 'templates/aceResults.html',
            controller: 'AceResultsController'
        }).
        when('/video', {
            template: 'VIDEO CONTROLLER',
            // controller: 'AceVideoController'
        }).
         when('/video/distribute', {
            template: 'DISTRIBUTE CONTROLLER'
        }).
        otherwise({
            redirectTo: '/'
        });
    
    $locationProvider.html5Mode(true).hashPrefix('!');;
});

ACE.filter("trustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
}]);