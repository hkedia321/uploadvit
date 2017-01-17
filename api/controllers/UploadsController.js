/**
 * UploadsController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require("async");
module.exports = {
  'all': function (req, res, next) {
    if (req.session.authenticated && req.session.user.regno == '15BCE0329')
      return next();
    else
      return res.forbidden();
  },
  'new': function (req, res) {
    var len = Object.keys(req.allParams()).length;
    if (len == 0) {
      res.redirect('/uploads/show');
    } else {
      var prefix_file="annonymous";
      if(req.session.authenticated)
        prefix_file=req.session.user.regno;
      prefix_file+="_";
      var var_fileurl = "";
      var var_filename = "";
      req.file('file').upload({
        // don't allow the total upload size to exceed ~1MB
        maxBytes: 1000000,
        dirname: './../../assets/files/',
        saveAs: function(file, cb) {
          cb(null, prefix_file+file.filename);
        }
      }, function whenDone(err, uploadedFiles) {
        if (err)
          console.log("Error file uploading:" + err);
        else {
          if (uploadedFiles.length != 0) {
            var_fileurl = sails.getBaseUrl()+"/files/"+prefix_file+uploadedFiles[0].filename;
            var_filename = uploadedFiles[0].filename
          }
        }
        var var_public = req.param('public');
        if(typeof var_public !=='undefined' && var_public)
        {
          var_public=true;
          console.log("public is true");
        }
        else
        {
          var_public=false;
          console.log("public is false");
        }
        var params_needed = {
          owner_regno: req.param('owner_regno'),
          name: req.param('name'),
          subject: req.param('subject'),
          notes: req.param('notes'),
          public: var_public,
          fileurl: var_fileurl,
          filename: var_filename
        };
        if (req.session.authenticated)
          params_needed.name = req.session.user.name;
        Uploads.create(params_needed, function uploadCreated(err, upload) {
          if (err) {
            console.log(err);
            req.session.flasherr = {
              err: err
            };
            return res.redirect('/');
          }
          req.session.flashsuccess = {
            message: "Successfully Created an entry"
          };
          return res.redirect('/uploads/show');
        });
      });

    }
  },
  'show': function (req, res, next) {
    Uploads.find(function foundUpload(err, uploads) {
      if (err) return next(err);
      res.view({
        uploads: uploads
      });
    });
  }
};

