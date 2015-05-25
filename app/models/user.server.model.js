'use strict'
//include mongoose module
const mongoose=require("mongoose");
//create a schema
const Schema=mongoose.Schema;
//include crypto module
const crypto=require('crypto');

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
    },
    //lets add an index to later search by this field
    index:true
  },
  //add required validator for lastName field
  lastName:{
            type:String, default:"",
            required:'{PATH} field is required'
          },
  //add match validator for email field
  email:{
          type:String, default:"",
          match:[/\S+@\S+\.\S+/,"{PATH} field is invalid"]
        },
  //trim is a modifier that deletes spaces at the end and the begining
  username:{
    type:String,
    //set this field as unique
    unique:true,
    required:'Username is required',
    trim:true
  },
  password:{
    type:String, default:"",
    //verify the password's length
    validate:[
      function(pass){
        if( pass.length < 3 ){
          return false;
        }
        return pass;
      },'{PATH} field is too short'
    ]
  },
  //this will be used to hassh the password
  salt:{ type:String,default:""},
  //will indicate the strategy used to register the user
  provider:{ type:String,required:'Provider is required.'},
  //will indicate the user identifier for the authentication strategy
  providerId:{ type:String,default:""},
  //here will be stored the user object retrieved from OAuth providers
  providerData:{ },
  created: { type:Date, default:Date.now},
  //add the enum validator to state field
  state:{
    type:String,
    default:"A",
    enum:{
      values:["A","I"],message:"field {PATH} require as values (A,I)"
    }
  }
});

//enable virtual attribute that joins firstName and LastName fields
UserSchema.virtual('fullName').get(function(){
  return this.firstName+' '+this.lastName;
});

//Pre save middleware, this will hash the pass before save the user
UserSchema.pre('save',function(next){
  //create an autogenerated pseudo-random hash
  this.salt=crypto.randomBytes(16).toString('base64');
  //hash the pass
  this.password=this.hashPass(this.password);
})

//create an instance method using mongoose
UserSchema.methods.hashPass=function(pass){
  return crypto.pbkdf2Sync(pass,this.salt,10000,64).toString('base64');
}

//check if the received pass is equal to the pass that is encrypted
UserSchema.methods.authenticate=function(pass){
  return this.password == this.hashPass(pass)
}

//define a static method to look for an user
UserSchema.statics.findUniqueUser=function(userName,suffix,cb){
  let self=this;
  let possibleUser=userName+( suffix || '' );

  self.findOne(
    {username:possibleUser},//set the param for the query
    function(err,userFound){ //set the callback to get an error or an user
      if(!err){
        if(!userFound){
          cb(possibleUser);
        }
        else{
          return self.findUniqueUser(userName,(suffix || 0) +1,cb);
        }
      }
      else{
        cb(null);
      }

    });
}

//enable a static method to look for an user using its id
UserSchema.statics.userExists=function(id,cb){
  let self=this;

  //get an user's id and look for it into db
  self.findById(
    id,
    function(err,found){
      if(found){ cb(true); }
      else{ cb(false); }
    }
  );

}

//enable the getters whe using to json method and enable virtual attributes
UserSchema.set('toJSON',{getters:true,virtuals:true})

//Use the UserSchema instance to define the user model
mongoose.model('User',UserSchema);
