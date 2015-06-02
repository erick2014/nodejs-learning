 //configure the route provider setting the paths
 angular.module("example").config(['$routeProvider',
  function($routeProvider){
    $routeProvider
    //define a new route passing the route's url and the template's url
    .when("/",{
      templateUrl:'example/views/example.client.view.html'
    })

    .when("/signin",{
      redirectTo:"/"
    })

    //Used when a user try to get an undefined route
    .otherwise({
      templateUrl:'example/views/error.client.view.html'
    })
  }

])