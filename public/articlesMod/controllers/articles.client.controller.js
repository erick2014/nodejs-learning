 //use the Article module and inject the getUsers service
 angular.module("Article").controller('ArticleCtrl',['$scope','getArticlesFact',
  function($scope,getArticlesFact){
   $scope.articles=[];
   //get the articles
    getArticlesFact().then(function(articles){
      console.log("getting articles...",articles);
      $scope.articles=articles.data;
    });
  }
])

