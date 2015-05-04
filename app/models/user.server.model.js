//include mongoose module
const mongoose=require("mongoose");
//create a schema
const Schema=mongoose.Schema;

//define a user Schema and set the fields
var UserSchema=new Schema({
  firstName:String,
  lastName:String,
  email:String,
  username:String,
  password:String
});

//Use the UserSchema instance to define the user model
mongoose.model('User',UserSchema);