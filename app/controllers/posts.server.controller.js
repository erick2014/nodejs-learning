/**************User Controller, that Handles User model requests **************/
'use strict'
//include the mongoose mdule
const mongoose=require("mongoose");
//include the post's model
const Post=mongoose.model('Post');
//include the user's model
const User=mongoose.model('User');

//expose a create function to later create new users
exports.create=function(req,res,next){
  console.log("calling create method from posts...");
  //check if the user exists before to save it!
  User.userExists(req.body.author,function(userFound){
    //if there was a valid user then save it!
    if(userFound){
      //create a new instance for post model and pass in the request body
      let post=new Post(req.body);
      //save the user and outputs the user object as json
      post.save(function(err){
        //catch any error
        if(err){
          //pass the error to the error middleware handler
          return next(err);
        }
        else{
          //send a response as json
          res.send("post saved!"+post);
        }
      });
    }
    else{
      res.send("You need a valid author to save the post!")
    }
  })

};

exports.findByID=function(req,res,next){
  if( req.body.author != undefined || req.body.author!=null ){
    User.findOne({_id:req.body.author},function(err,user){
      if(err) {
        next(err)
      }else{
       //set the user that was found to later save the post
       req.user=user;
       //go to create the post using a valid user's id
       next();
      }
    })
  }
  else{
    return next("Check your request params")
  }
}

exports.listPosts=function(req,res,next){
  Post
    .find({})
    .populate("author")
    .exec(function(err,post){
      if(err) return next(err)
      //count the elements inside my object
      let postKeys=Object.keys(post);
      let objLength=postKeys.length;
      let strPosts="";
      //loop each object and show it
      for(let i=objLength;i--;){
        //lets use string template from ES6
        strPosts+=`postId=${post[postKeys[i]]["_id"]} <br/>
          title=${post[postKeys[i]]["title"]} <br/>
          description=${post[postKeys[i]]["description"]} <br/>
          author=${post[postKeys[i]]["author"]} <br/><br/>
        `;
      }
      res.send(strPosts);
    })

}
