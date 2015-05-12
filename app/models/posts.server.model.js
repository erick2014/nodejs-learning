//include mongoose module
const mongoose=require("mongoose");
//create a schema
const Schema=mongoose.Schema;

//define a post schema
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