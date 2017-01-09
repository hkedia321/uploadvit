/**
 * UploadsController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  'new': function (req, res) {
    var len = Object.keys(req.allParams()).length;
    console.log("length:" + len);
    if (len == 0)
      res.redirect('/uploads/show');
    else {
      var params_needed={
        name:req.param('name'),
        subject:req.param('subject'),
        notes:req.param('notes')
      };
      Uploads.create(params_needed,function uploadCreated(err,upload){
        if(err){
          console.log(err);
          req.session.flash={
            err:err
          };
          return res.redirect('/');
        }
        req.session.success={
          message:"Successfully Created an entry"
        };
        return res.redirect('/uploads/show');
      });
    }
  },
  'show':function(req,res,next){
  Uploads.find(function foundUpload(err,uploads){
    if(err) return next(err);
    res.view({
      uploads:uploads
    });
  });
  }
};

