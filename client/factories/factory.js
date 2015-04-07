myApp.factory('gifFactory', function($http) {
	var factory = {};
	factory.gif = {};
	factory.url_arr = [];

	factory.clear = function() {
		factory.gif = {};
		factory.url_arr = [];
	}

	factory.submit = function(search, callback) {
		// console.log('factory');
		// console.log(search);
		$http.post('/getGif',search).success(function(data) {
			factory.gif = data;
			console.log(factory.gif);
			for (var i=0; i< data.data.length; i++ ) {
				//console.log($scope.obj_results.data[i].images.fixed_width.url);
				factory.url_arr.push(factory.gif.data[i].images.fixed_width.url);
			}
			callback(data);
		});
	}
	return factory
})