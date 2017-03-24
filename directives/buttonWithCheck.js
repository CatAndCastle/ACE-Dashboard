ACE.directive('buttonWithCheck', function(){
	var controller = ['$scope', function ($scope) {
		$scope.onMouseDown = function(){
			$($scope.thisEl).addClass('active');
		}
		$scope.onMouseUp = function(){
			$($scope.thisEl).removeClass('active');
		}
	}];

	return {
		restrict: "E",
		transclude: true,
		template: "<div ng-mousedown='onMouseDown()' ng-mouseup='onMouseUp()'><span><ng-transclude></ng-transclude></span><img ng-src='img/checkmark.png' /></div>",
		controller: controller,
		link: function(scope, element){
			scope.thisEl = element;
		}
	}
});