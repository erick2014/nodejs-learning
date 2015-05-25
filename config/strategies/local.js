'use strict'
/* define a local strategy */
//include de passport module
const passport=require('passport');
//include the local strategy
const LocalStrategy=require('passport-local').Strategy;
//include the user model
const User=require('mongoose').model('User');

module.exports=function(){
  //set the strategy's configuration, using the use method from passport
  passport.use(
    //get an instance of local Strategy and pass in a callback
    //the callback will get executed when an user is trying to authenticate
    new LocalStrategy(function(username,password,done){
      //look for an user using User's model
      User.findOne(
        //pass the query and pass it the username received as value
        { "username":username },
        //pass a callback
        function(err,user){
          //use the done callback from Localstrategy to catch an error
          if( err ) return done(err);
          //catch incorrect username
          if( !user ) return done(null,false,{ message:'Incorrect username' });
          //catch incorrect pass
          if( !user.validPassword(password) ){
            return done(null,false,{ message:'Incorrect password' })
          }
          //if there was not error found, just return the user
          return done(null,user)
        }
      )
    })
  );
}