//enablel ES6 using strict mode
'use strict'
/*This route will controll the route for users */

//include the users controller
const posts=require("../controllers/posts.server.controller");
//export the route passing it the app object
module.exports=function(app){

  //enable posts route
  app.route('/posts')
  .get(posts.listPosts)
  .post(posts.findByID)

  //next middleware
  app.use(posts.create);

  //error middleware handler
  app.use(function(err,req,res,next){
    res.send(err);
  })

}