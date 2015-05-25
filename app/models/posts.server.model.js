'use strict'
//create a schema
const mongoose=require("mongoose");
//get the schema object
const Schema=mongoose.Schema;

//Create a new instance of schema
var PostSchema=new Schema({
  title:{
    type:String,
    default:""
  },
  description:{
    type:String,
    default:""
  },
  author:{
    //define this field as dbref using the user model
    type:Schema.ObjectId,ref:'User',
    required:true
  }

})

//define a post schema
mongoose.model('Post',PostSchema);