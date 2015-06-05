//configure the route provider setting the paths
angular.module("Article").config(['$routeProvider',
  function($routeProvider){
    $routeProvider
    //define a new route passing the route's url and the template's url
    .when("/articles",{
      templateUrl:'articlesMod/views/listArticle.client.view.html',
      controller:'ArticleCtrl'
    })
    .when("/articles/new",{
      templateUrl:'articlesMod/views/newArticle.client.view.html',
      controller:'ArticleCtrlNew'
    })

    //Used when a user try to get an undefined route
    .otherwise({
      templateUrl:'example/views/error.client.view.html'
    })
  }

])