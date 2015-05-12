'use strict'
/*User Controller, that Handles User model requests */
const Post=require("mongoose").model('Post');

//expose a create function to later create new users
exports.create=function(req,res,next){
  //check if the user was found
  if( req.user ){
    //create a new instance for post model
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
    return next("No user received to save")
  }

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
