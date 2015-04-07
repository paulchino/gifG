
myApp.controller("view1Controller", function($scope, $route, gifFactory, $location) {
	$scope.search = {};

	gifFactory.clear();

	$scope.searchForm = function() {
		$("body").css("cursor", "progress");

		gifFactory.submit($scope.search, function(data) {
			$location.path('/gifs');
		});
	}
})
	
