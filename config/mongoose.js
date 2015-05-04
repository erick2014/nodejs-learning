//load the cofing file for my current environment
const config=require("./config");
const mongoose=require('mongoose');

module.exports=function(){
  //try to connect to moongodb using the uri defined into development file
  var db=mongoose.connect(config.db);
  //include the user model
  require("../app/models/user.server.model");
  //return a moongose instance
  return db;
}

