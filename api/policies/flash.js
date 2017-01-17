module.exports=function(req,res,next){
  res.locals.flasherr={};
  if(req.session.flasherr) {
    res.locals.flasherr = _.clone(req.session.flasherr);
  }
  req.session.flasherr={};
  res.locals.flashsuccess={};
  if(req.session.flashsuccess) {
    res.locals.flashsuccess = _.clone(req.session.flashsuccess);
  }
  req.session.flashsuccess={};
  next();
};
