'use strict'
/*This route will controll the route for users */

//include the users controller
const users=require("../controllers/users.server.controller");
const articles=require("../controllers/articles.server.controller");

//export the route passing it the app object
module.exports=function(app){
  app.route("/api/articles")
    .get(articles.list)
    //before to create create an article validate the loggin
    .post( users.requiresLogin,articles.create)

  app.route("/api/articles/:articleId")
    .get(articles.read)
    //before to update an article, validate the loggin
    //later check if the creator is logged in
  	.put( users.requiresLogin )
    .put( articles.hasAuthorization ) 
    .put( articles.update )
     //before to delete an article, validate the loggin
    //later check if the creator is logged in
  	.delete( users.requiresLogin, articles.hasAuthorization, articles.delete);

  //url parameter handler
  app.param("articleId",articles.articleById);

  //error middleware handler
  app.use(function(err,req,res,next){
    res.send(err);
  })
}