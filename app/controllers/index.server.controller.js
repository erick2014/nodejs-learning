'use strict'
/*Index controller */

exports.render=function(req,res){
  var sess=req.session
  //well here, im trying to get the view property from session
  if(sess.views){
    sess.views++;
    console.log(`visit number ${sess.views}`);
  }
  //setting a new property's value if doesnt exists
  else{
    sess.views=1;
  }

  res.render('index',{
    title:"Index Page",
    content:"amm some text over here..",
    messages:req.flash("error")
  });

}