/*Article Controller, that Handles the Article model requests */
'use strict'
const Article=require("mongoose").model('Article');
//include the error handler module
const errorHandler=require("../models/errorsHandler.server.model.js");

//validate if the user logged is owner of an article, then can edit or delete it
exports.hasAuthorization=function(req,res,next){
  //if the creator is not current logged in user, then deny the access
  if( req.article.creator.id !==req.user.id ){
    return res.status(403).send({ message:'User is not authorized' });
  }
}

//create method will provide basic functionality to create a new article
exports.create=function(req,res,next){

  //get an instance from article model
  let article=new Article(req.body);
  //set the user object to the creator field(user has to be logged in)
  article.creator=req.user;

  article.save(function(err){
     //catch any error, return the server status and its error message
    if(err){
      //return an object with the exception
      return res.status(400).send({message:errorHandler(err)})
    }
    else{
      //return the article object that was saved
      res.json(article);
    }
  })
}

//print out the article object
exports.read=function(req,res){
  res.json(req.article);
}

//articleById method will get an article by id
exports.articleById=function(req,res,next,id){
  //get the article by id
  Article.findById(id)
  //get the creator
  .populate('creator','firstName lastName fullName')
  //perform the query
  .exec(function(err,article){
    //return the error to the error handler
    if(err){ return next(err) }
    //if the user was not found call the error handler
    //with a specific error
    if( !article ) return next( new Error('Failed to find the article '+id) );
    //set the article object to the request object
    req.article=article;
    //call the next middleware(/articles/:id)
    next();
  })
}

//get all articles and bring their own creator(users Collection)
exports.list=function(req,res,next){
   Article
    .find({})
    .sort('-created')//sort the fields in asc order
    .lean() //convert mongo's object to json object
    //get the creators(users) specifying only firstName and LastName fields
    .populate("creator", 'firstName lastName')
    //execute the query
    .exec(function(err,articles){
      if(err){
        res.status(400).send({message:errorHandler(err)})
      }else{
        res.send(articles);
      }
    })
}

//update an article, getting it from request object
exports.update=function(req,res){
  let article=req.article;

  article.title=req.body.title;
  article.content=req.body.content;

  article.save(function(err){
    if(err){
      return res.status(400).send( {message:errorHandler(err)} );
    }
    else{
      res.json(article);
    }
  })
}

//delete an existing article 
exports.delete=function(req,res){
  //set the article's object
  let art=req.article;
  //remove document using the article's object
  art.remove(function(err,article){
    if( err ){
      return res.status(400).send( {message:errorHandler(err)} );
    }
    else{
      res.json(article)
    }
  })
}