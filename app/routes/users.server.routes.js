/*This route will controll the route for users */

//include the users controller
const users=require("../controllers/users.server.controller");
//export the route passing it the app object
module.exports=function(app){
  //enable users path to handle post requests and create a new user
  //calling the create method from users controller
  app.route('/users')
  .get(users.listUsers)
  .post(users.create)

  //this method will be called before the route method
  //when a user requests the /users path passing in a parameter
  app.param("userId",users.userById);

  //this route will handle the requests to the users path but
  //passing in an id of a document
  app.route('/users/:userId')
    .get(users.read)//perform a search by id
    .put(users.update)//perform an update by id
    .delete(users.delete)
}