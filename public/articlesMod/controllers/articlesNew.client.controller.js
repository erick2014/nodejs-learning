 //use the Article module and inject the Authentication service
 angular.module("Article").controller('ArticleCtrlNew',['$scope','$location','Authentication',
  function($scope,$location,Authentication){
    //the first thing is check if the user is logged in
    if(!Authentication.user){
      $location.path("/");
    }
  }
])

