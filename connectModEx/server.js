//include my middlewares
var middles=require("./middlewares");

//include the connect module
var connect=require("connect");
//get an instance of connect module
var app=connect();

//register the middlewares into connect's module
app.use(middles.logger);
//register the middleware for /hello path
app.use('/hello',middles.helloWorld);
//register the middleware for /goodbye path
app.use('/goodbye',middles.goodbyeWorld);
//start the server at port 3000
app.listen(3000);
console.log("Server running at http://localhost:3000");
