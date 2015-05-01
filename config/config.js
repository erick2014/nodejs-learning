//load the right configuration file depends on the current environment
module.exports= require('./env/'+process.env.NODE_ENV+'.js')