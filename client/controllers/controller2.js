
myApp.controller("view2Controller", function($scope, $route, gifFactory, $location) {
	$scope.bricks = [];
	$scope.message = "";
	$scope.bricks = [];

	$("body").css("cursor", "default");

	if ( gifFactory.url_arr.length == 0) {
		$scope.message = 'no results try another search!';
		$scope.home_link = '/gifs';
	} else {
		$scope.bricks = gifFactory.url_arr;
	}
})
	
