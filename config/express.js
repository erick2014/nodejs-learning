const express=require('express');

module.exports=function(){
  //get an express instance
  const app=express();
  //include the index route
  require("../app/routes/index.server.routes.js")(app);

  return app;
};