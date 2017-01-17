/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new':function(req,res,next){
    var len = Object.keys(req.allParams()).length;
    if(len==0)
     return res.view();
    else
    {
        var regno=req.param('regno');
        var password=req.allParams('password');
        Users.findOneByRegno(regno,function foundUser(err,user){
          if(err)
          {
            return res.view({err:'Wrong reg no or password'});
          }
          req.session.authenticated = true;
          req.session.user = user;
          res.redirect('/');
        });
    }
},
'destroy':function(req,res,next){
  req.session.authenticated=false;
  req.session.user=null;
  return res.redirect('/');
}
};

