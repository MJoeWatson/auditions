var passport = require('passport');
var  session = require('express-session');

module.exports = {

  // GOOGLE
  loginUser: loginUser,
  redirectUser: redirectUser

}

function loginUser(req, res, next) {
  passport.authenticate('google', {scope:"profile"}),
  function(req, res){};
}

function redirectUser(req, res, next) {
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    req.session.save(() => {
      res.redirect('/account');
    });
  }
}
