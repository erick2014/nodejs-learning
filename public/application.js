var mainAppModuleName='meanApp';
//create an angular module and set its dependencies
var mainAppModule=angular.module(mainAppModuleName,['ngRoute','example','users']);

//configure the location provider
mainAppModule.config(['$locationProvider',
  function($locationProvider){
    $locationProvider.hashPrefix("!");
  }
])


//wait until page is loaded
angular.element(document).ready(function(){
  //initiate a new angular app
  angular.bootstrap(document,[mainAppModuleName]);
})