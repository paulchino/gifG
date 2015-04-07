var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/view1.html'
    })
    .when('/gifs',{
        templateUrl: 'partials/view2.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
