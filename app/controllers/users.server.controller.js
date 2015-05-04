/*User Controller, that Handles User model requests */
const User=require("mongoose").model('User');

//expose a create function to later create new users
exports.create=function(req,res,next){
  //get an instance of User model passing it the
  //request body
  var user=new User(req.body);
  console.log("User instance",user);

  //save the user and outputs the user object as json
  user.save(function(err){
    //catch any error
    if(err){
      //pass the error to the next middleware
      return next(err);
    }
    else{
      //send a response as json
      res.json(user);
    }

  });
}

exports.listUsers=function(req,res,next){
  console.log("user Model",User);
  //performing a query that matches all documents
  User.find({},function(err,docs){
    if(err){
      return next(err);
    }else{
      console.log("docs returned",docs)
      res.json(docs);
    }
  })
}