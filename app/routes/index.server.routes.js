module.exports=function(app){
  const index=require("../controller/index.server.controller");
  app.get('/',index.render);
}