const express=require('express');
const app=express();
const port=3000;

var hasName=function(req,res,next){
  if(req.param('name')){
    next();
  }
  else{
    res.end("What is your name?");
  }
};

var sayHello=function(req,res,next){
  res.send('Hello '+req.param('name'));
}

//middleware for root path
app.get("/",hasName,sayHello);

//set webserver's port
app.listen(port);
//using string template ecmascript 6
console.log(`Server running at http://localhost:${port}`);

//export app instance
module.exports=app;