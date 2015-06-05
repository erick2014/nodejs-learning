'use strict'
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

//define the article schema
let ArticleSchema=new Schema({
  //this field represents the time at which the article was created
  created:{
    type:Date,
    default:Date.now
  },
  //article title
  title:{
    type:String,
    default:'',
    trim:true,
    required:'Title cannot be blank'
  },
  //article content
  content:{
    type:String,
    default:'',
    trim:true
  },
  //this is a refrence object that represents the user who created the article
  creator:{
    type:Schema.ObjectId,
    ref:'User'
  }

})
//create the model passing in the article schema
mongoose.model("Article",ArticleSchema);