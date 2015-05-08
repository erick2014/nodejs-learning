/*User Controller, that Handles User model requests */
const User=require("mongoose").model('User');

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
  }else{
  res.send("the user founded was:"+req.user);
  //res.json(req.user);
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