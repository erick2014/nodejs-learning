/* serialization and deserialization logic */
'use strict'
const passport=require('passport');
const User=require('mongoose').model('User');

module.exports=function(){
  //here the user id is serialized to the session
  passport.serializeUser(function(user,done){
    done(null,user.id);
  })

  passport.deserializeUser(function(id,done){
    //perform a query using the user id, also avoid to fetch the pass and salt fields
    User.findById(id,'-password -salt',function(err,user){
      done(err,user);
    })
  });
  console.log("calling the passport config file...")
  //include the local strategy
  require('./strategies/local.js')();
};