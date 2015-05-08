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
      //if it has http then just return the url
      else{
        return url;
      }
    }
  },
  //set default values for each field and its type
  firstName:{
    type:String,
    //this getter will add some text to the first name field value
    //when returning the data to the view
    get:function(name){
      if(!name){
        return 'none';
      }
      return `hey body ${name}`;
    }
  },
  lastName:{ type:String, default:""},
  email:{ type:String, default:""},
  //trim is a modifier that deletes spaces at the end and the begining
  username:{ type:String, default:"",trim:true},
  password:{ type:String, default:""},
  created: { type:String, default:Date.now}
});

//enable virtual attribute that joins firstName and LastName fields
UserSchema.virtual('fullName').get(function(){
  return this.firstName+' '+this.lastName;
})

//enable the getters whe using to json method and enable virtual attributes
UserSchema.set('toJSON',{getters:true,virtuals:true})

//Use the UserSchema instance to define the user model
mongoose.model('User',UserSchema);