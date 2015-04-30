const express=require('express');
const app=express();
const port=3000;

//middleware for root path
app.use("/",function(req,res){
  res.send("Hello world!");
});

//set webserver's port
app.listen(port);
//using string template ecmascript 6
console.log(`Server running at http://localhost:${port}`);

//export app instance
module.exports=app;