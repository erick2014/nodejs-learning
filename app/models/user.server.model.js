//include mongoose module
const mongoose=require("mongoose");
//create a schema
const Schema=mongoose.Schema;

//define a user Schema and set the fields
var UserSchema=new Schema({

  website:{
    type:String,
    //define a setter to modify the field's value after saving into db
    set:function(url){
      //check if there  is url value
      if(!url){
        return url;
      }
      //check if it has https and change it for http
      if ( url.match(/https/i) != null ) {
        return url.replace('https','http');
        //return "holly crap";
      }
      //if it doesnt have http, set it
      else if( url.match(/http/i) == null ){
        return 'http://'+url;
      }
    }
  },
  //set default values for each field and its type
  firstName:{ type:String, default:""},
  lastName:{ type:String, default:""},
  email:{ type:String, default:""},
  //trim is a modifier that deletes spaces at the end and the begining
  username:{ type:String, default:"",trim:true},
  password:{ type:String, default:""},
  created: { type:String, default:Date.now}
});

//enable the getters
//UserSchema.set({getter:true})

//Use the UserSchema instance to define the user model
mongoose.model('User',UserSchema);