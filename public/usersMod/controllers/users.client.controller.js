 //use the users module and inject the Authentication service
 angular.module("Users").controller('UserCtrl',['$scope','Authentication',
  function($scope,Authentication){
    $scope.name=Authentication.user ? Authentication.user.fullName: 'Cmon signin man!';
  }
])

