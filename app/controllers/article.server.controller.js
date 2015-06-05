/*Article Controller, that Handles the Article model requests */
'use strict'
const Article=require("mongoose").model('Article');
//include the error handler module
const errorHandler=require("../models/errorsHandler.server.model.js");

//create method will provide basic functionality to create a new article
exports.create=function(req,res,next){

  //get an instance from article model
  let article=new Article(req.body);
  //set the user object to the creator field(use has to be logged in)
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

//get all articles and bring their own creator(users Collection)
exports.list=function(req,res,next){
   Article
    .find({})
    .lean() //convert mongo's object to json object
    .populate("creator", 'firstName lastName')//get the creators(users)
    .exec(function(err,articles){
      if(err){
        res.status(400).send({message:errorHandler(err)})
      }else{
        res.send(articles);
      }
    })
}
