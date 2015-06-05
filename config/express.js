//use the environment's configuration file
const config=require('./config');
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
//this module provides session functionality o:
const session=require("express-session");
//include the flash messages module
const flash=require("connect-flash");
//load the passport module
const passport=require('passport');

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
  //load the session middleware

  app.use(session({
    saveUninitialized:true,
    resave:false,
    secret:config.sessionSecret,
    name:"express"
  }))

  //register the initialize middleware(required to initialize Passport)
  app.use(passport.initialize());
  //this middleware is responsible to keep track of user's session
  app.use(passport.session());

  //set the directory where template files are located
  app.set('views','./app/views/');
  //set the template engine(ejs)
  app.set('view engine','ejs')

  //load the flash middleware
  app.use(flash());

  //include the index route
  require("../app/routes/index.server.routes.js")(app);
  //include the users route
  require("../app/routes/users.server.routes")(app);
  //inclue the posts route
  require("../app/routes/posts.server.routes")(app);
  //include the article route
  require("../app/routes/article.server.routes")(app);

  //add the public files using static middleware from express
  app.use(express.static('./public'));

  return app;
};