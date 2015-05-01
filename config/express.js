//express module
const express=require('express');
//this provides a simple logger middleware
const morgan=require("morgan");
//this provides response compression
const compress=require("compression");
// this provides several middlewares to handle request data
const bodyParser=require("body-parser");
//this provides delete and put verbs
const methodOverride=require("method-override");

module.exports=function(){
  //get an express instance
  const app=express();
  //check the current environment
  if( process.env.NODE_ENV === 'development' ){
    //here we load the morgan middleware
    app.use(morgan('dev'));
  }
  else if( process.env.NODE_ENV ==='production' ){
    //here we load the compress middleware
    app.use(compress())
  }

  //load the urlencode method from bodyParser
  app.use(bodyParser.urlencoded({
    extended:true
  }));

  //load the json method from body parser
  app.use(bodyParser.json());
  //load the override middleware
  app.use(methodOverride());

  //set the directory where template files are located
  app.set('views','../app/views');
  //set the template engine(ejs)
  app.set('view engine','ejs')

  //include the index route
  require("../app/routes/index.server.routes.js")(app);

  return app;
};