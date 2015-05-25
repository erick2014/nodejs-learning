/*User Controller, that Handles User model requests */
'use strict'
const User=require("mongoose").model('User');
//include the authentication module
const passport=require("passport");

//define an anonymous function that parses the authentication errors
let getErrorMessage=function(err){
  let message="";
  if( err.code ){
    //define some code errors
    switch( err.code ){
      case 11000:
      case 11001:
        message='Username already exists!';
        break;
      default:
        message="Something went wrong";
    }
  }
  else{
    //loop through errors
    /*for( let errName in err.errors){
      if( err.errors[errName].message ){
        message=err.errors[err]
      }
    }*/
    message=err.errors;
  }
  return message;
}

//define a render Signin method for login purposes
exports.renderSignin=function(req,res,next){
  //check if the user is logged in
  if(!req.user){
    res.render(
      'signin',
      {title:"Sign-in form",messages:req.flash('error') || req.flash('info') }
    );
  }
  else{ return res.redirect("/"); }
}

//define a render Signup method to registering purposes
exports.renderSignup=function(req,res,next){
  //check if the user is logged in
  if( !req.user ){
    res.render(
      'signup',
      {title:"Sign-up form",messages:req.flash('error') || req.flash('info') }
    );
  }
  else{ return res.redirect("/"); }
}



//expose a create function to later create new users
exports.create=function(req,res,next){
  //get an instance of User model passing it the
  //request body
  var user=new User(req.body);

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
};

//this method is for listing the documents(all)
exports.listUsers=function(req,res,next){

  //performing a query that matches all documents
  User.find({},'firstName lastName email username',
    function(err,docs){
      if(err){
        return next(err);
      }else{
        res.json(docs);
      }
  })
}

//exports a function that responds with a json object
exports.read=function(req,res){
  if(req.user==null){
    res.send("omg the user doesn't exits yet");
  }
  else{
    res.send("the user founded was:"+req.user);
  }
}

//this function will get the document by id
exports.userById=function(req,res,next,id){
  User.findOne(
    { _id:id },
    'firstName username email', //projection
    function(err,userFound){ //callback
      //if there was an error, then pass it to the next middleware
      if(err){
        return next(err);
      }else{
        //set the user founded to the request object,
        //to later print it out throught the response object
        req.user=userFound;
        //call the next middleware(the read() middleware)
        next();
      }
    }
  );
}

exports.userByName=function(req,res,next,name){
  User.findOne({"firstName":name},'firstName lastName created',
    function(err,user){
      if(err) res.send(err);
      else req.user=user;next();
    }
  );
}

//this method will update a document using the id received on the request
exports.update=function(req,res,next){
  User.findByIdAndUpdate(
    req.user.id,
    req.body,
    function(err,user){
      if(err){
        return next(err);
      }else{
        res.send("User updated=",req.body);
      }
    }
  );
};

//this method deletes a document using its id
exports.delete=function(req,res,next){
  User.remove(req.user,function(err,query){
    if(err){
      res.send("were an error deleting the thing..")
    }
    else{
     res.send("user deleted=",query)
    }
  })

}

//this will generate a bunch of data into db
exports.generateData=function(req,res,next){

  for(let i=1;i<=10000;i++){
    let firstName="umm_"+i;
    let lastName="jamm_"+i;

    let user=new User({
      "firstName":firstName,
      "lastName":lastName
    });

    user.save(function( err,data ){
      if(err){
        console.log("something were wrong O:");
        res.send("was an error populating the db");
      }else{
        console.log(data);
      }
    })
  }

  //end the request ofcourse man
  res.end("Thats all :)");

}