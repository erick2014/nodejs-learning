'use strict'
//define an error handler method
module.exports=function(err){
  let errs="";

  if(err.errors){
    for( let errName in err.errors ){
      if(err.errors[errName].message){
       //return only the first error message
       return err.errors[errName];
      }
    }
    return errs;
  }
  else{
    return 'Unknown server error ';
  }
}