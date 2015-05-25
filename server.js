//if there is not an environment then set it
process.env.NODE_ENV= process.env.NODE_ENV || 'development'
//include the mongoose config file to get an instance
const mongoose=require('./config/mongoose')();

/*include the configuration file
  also load the route and its controller
*/
const app=require("./config/express")();
//load the passport configuration file.
const passport=require('./config/passport')();

//set a port to listen to
const port=3000;

//port to listen to
app.listen(port);
//show a message whe server is running
console.log(`Server listening at port ${port}`);