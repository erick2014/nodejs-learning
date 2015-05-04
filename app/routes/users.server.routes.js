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
}