angular.module("Users").factory('getUsersFactory',['$http',
  function($http){
    var promise;
    return function(){
      if(!promise){
          promise= $http.get('/users');
      }
      return promise;
    }
  }
]);