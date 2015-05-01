//set a port to listen to
const port=3000;
/*include the configuration file
  also load the route and its controller
*/
const app=require("./config/express")();

//port to listen to
app.listen(port);
//show a message whe server is running
console.log(`Server listening at port ${port}`);