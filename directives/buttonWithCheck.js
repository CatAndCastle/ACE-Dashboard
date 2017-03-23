ACE.directive('buttonWithCheck', function(){
  return {
    restrict: "E",
    transclude: true,
    template: "<span><ng-transclude></ng-transclude></span><img ng-src='img/checkmark.png' />"
  }
});