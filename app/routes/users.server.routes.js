'use strict'
/*This route will controll the route for users */

//include the users controller
const users=require("../controllers/users.server.controller");
//include the passport module
const passport=require("passport");


//export the route passing it the app object
module.exports=function(app){

  //add a sigin route
  app.route('/signin')
    .get(users.renderSignin) //when performs a get request, render the signin view
    //when posting something try to authenticate
    .post( passport.authenticate(
      'local',
      { successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true}
    ));

  app.route("/signup")
    .get(users.renderSignup)
    .post(users.signupProcess) //receive data for signup

  //add some random data to the db
  app.route("/generateData")
    .get(users.generateData);

  //enable users path to handle post requests and create a new user
  //calling the create method from users controller
  app.route('/users')
  .get(users.listUsers)
  .post(users.create)

  app.param("userName",users.userByName);
  app.route("/users/:userName")
    .get(users.read);

  //this method will be called before the route method
  //when a user requests the /users path passing in a parameter
  app.param("userId",users.userById);

  //this route will handle the requests to the users path but
  //passing in an id of a document
  app.route('/users/:userId')
    .get(users.read)//perform a search by id
    .put(users.update)//perform an update by id
    .delete(users.delete)

  //error middleware handler
  app.use(function(err,req,res,next){
    let strErrors="";

    if( err.errors ){
      let errsKeys=Object.keys(err.errors);
      let objLength=errsKeys.length;
      //loop each error and create a string
      for(let i=objLength;i--;){
        strErrors+=err.errors[errsKeys[i]].message+","
      }
      //remove the last comma
      strErrors= strErrors.substring(0,(strErrors.length-1));

    }else{
      strErrors="check the request syntax "+err;
    }
    res.send(strErrors);
  })


}