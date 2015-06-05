var mainAppModuleName='meanApp';
//create an angular module and set its dependencies
var mainAppModule=angular.module(mainAppModuleName,['ngRoute','Users','Article']);

//configure the location provider
mainAppModule.config(['$locationProvider',
  function($locationProvider){
    $locationProvider.hashPrefix("!");
  }
])

//configure the route provider setting the paths
mainAppModule.config(['$routeProvider',
  function($routeProvider){
    $routeProvider
    //define a new route passing the route's url and the template's url
    .when("/",{
      templateUrl:'example/views/welcome.client.view.html'
    })

    //Used when a user try to get an undefined route
    .otherwise({
      templateUrl:'example/views/error.client.view.html'
    })
  }

])


//wait until page is loaded
angular.element(document).ready(function(){
  //initiate a new angular app
  angular.bootstrap(document,[mainAppModuleName]);
})