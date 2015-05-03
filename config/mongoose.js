//load the cofing file for my current environment
const config=require("./config");
const mongoose=require('mongoose');

module.exports=function(){
  //try to connect to moondb using the uri defined into development file
  var db=mongoose.connect(config.db);
  //return a moongose instance
  return db;
}

    