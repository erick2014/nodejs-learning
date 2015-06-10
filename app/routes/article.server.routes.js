'use strict'
/*This route will controll the route for users */

//include the users controller
const articles=require("../controllers/article.server.controller");

//export the route passing it the app object
module.exports=function(app){
  app.route("/articles")
  .get(articles.list)
  .post(articles.create)

  app.param(":id",articles.articleById);

  app.route("/articles/:id")
  	.get(articles.read)
  	.put(articles.update)
  	.delete(articles.delete);

  //error middleware handler
  app.use(function(err,req,res,next){
    res.send(err);
  })
}