module.exports={
  helloWorld:function(req,res,next){
    //set the response content-type header
    res.setHeader('Content-Type','text/plain');
    //set the response text and end the request
    res.end('Hello world!');
  },
  goodbyeWorld:function(req,res,next){
    //set the response content-type header
    res.setHeader('Content-Type','text/plain');
    //set the response text and end the request
    res.end('Goodby world!');
  },
  logger:function(req,res,next){
    console.log(req.method,req.url);
    next();
  }
}



































