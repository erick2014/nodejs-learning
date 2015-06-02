 //use the angular module called example
 angular.module("example").controller('ExCtrl',['$scope','notify',
  function($scope,notify){
    $scope.name="my name is Erick!";
    $scope.callNotify=function(msg){
      notify(msg);
    }
  }
])
 .factory('notify',['$window',function(win){
    var msgs=[];
    return function(msg){
      msgs.push(msg);
      if (msgs.length == 3) {
        win.alert(msgs.join("\n"));
        msgs=[];
      }
    }

}])
