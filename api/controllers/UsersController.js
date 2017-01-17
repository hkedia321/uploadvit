/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  'all': function (req, res, next) {
    if (req.session.authenticated && req.session.user.regno == '15BCE0329')
      return next();
    else
      return res.forbidden();
  },
  'new': function (req, res) {
    var len = Object.keys(req.allParams()).length;
    if (len == 0)
      return res.view();
    else {
      var us_name = req.param('name');
      var us_regno = req.param('regno');
      var us_password = req.param('password');
      var us_confirm = req.param('confirm');
      if (!us_name || !us_regno) {
        return res.view({
          err: "Name or regno can't be blank"
        });
      }
      if (!(us_confirm == us_password)) {
        return res.view({
          err: "Password must match"
        });
      }
      var params_needed = {
        name: us_name,
        regno: us_regno,
        password: us_password
      };
      Users.create(params_needed, function userCreated(err, user) {
        if (err) {
          req.session.flasherr = {
            err: "Error:Could'nt create a new account"
          };
          return res.redirect('/users/new');
        }
        req.session.authenticated = true;
        req.session.user = user;
        res.redirect('/');

      });
    }

  },
  'view': function (req, res, next) {
    var us_id = req.param('id');
    if (req.session.user.regno != us_id) {
      return res.forbidden();
    }
    else {
      res.view();
    }
  },
  'edit': function (req, res, next) {
    var len = Object.keys(req.allParams()).length;
    if (len == 0)
      return res.view();
    else {
      var us_regno = req.session.user.regno;
      var us_name = req.param('name');
      var us_password = req.param('password');
      var us_confirm = req.param('confirm');
      if (us_name.length == 0)
        return res.view({err: "Name can\'t be blank"});
      if (us_password != us_confirm)
        return res.view({err: "Password must match"});
      var params_needed = {
        name: us_name,
        password: us_password
      };
      Users.update(
        {regno: us_regno}, params_needed).exec(function userUpdated(err, updated) {
          if (err)
            return res.view({err: "Some error occured while updating"});
          req.session.user = updated[0];
          return res.view({success: "Successfully updated details"});
        }
      );
    }
  },
  myuploads: function (req, res, next) {
    var current_regno = req.session.user.regno;
    Uploads.find({owner_regno: current_regno}).exec(function (err, foundUploads) {
      if (err)
        return res.view({err: "Some error occurred reading from database"});
      res.view({foundUploads: foundUploads});
    });

  },
  myuploadsajax: function (req, res, next) {
    var current_regno = req.session.user.regno;
    Uploads.find({owner_regno: current_regno}).exec(function (err, foundUploads) {
      if (err)
        return res.view({err: "Some error occurred reading from database"});
      return res.json({foundUploads: foundUploads});
    });
  },

  deleteuploadajax: function (req, res, next) {
    var current_regno = req.session.user.regno;
    var id_todelete = req.param('id');
    var success = true;
    Uploads.destroy({owner_regno: current_regno, id: id_todelete}).exec(function (err) {
      if (err)
        success = false;
    });
    res.json({success: success});
  },
  makepublicajax: function (req, res, next) {
    var current_regno = req.session.user.regno;
    var uploadid = req.param('id');
    var public = req.param('public');
    var success = true;
    Uploads.update({owner_regno: current_regno, id: uploadid}, {public: public}).exec(function (err, updated) {
      if (err)
        success = false;
    });
    res.json({success: success});
  }
};

