angular.module("Article").factory('getArticlesFact',['$http',
  function($http){
    var promise;
    return function(){
      if(!promise){
          promise= $http.get('/articles');
      }
      return promise;
    }
  }
]);