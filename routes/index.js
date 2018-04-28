var express = require('express');
var router  = express.Router();
var passport = require('passport');
var session = require('express-session');
var util = require('util');
var cors = require('cors')
// var site    = require('./site');
var db      = require('./queries');
// var auth    = require('./auth');

var corsOptions = {
  origin:['http://localhost:3001'],
  credentials: true // enable set cookie
}

// General Site
router.get('/', function(req, res){
  res.render('index', { user: req.user });
});
router.get('/login', function(req, res){
  res.render('login');
});
// router.get('/account', ensureAuthenticated, site.toAccount);
router.get('/account', ensureAuthenticated, function(req, res){
  res.render('account');
});

// Google
// router.get('/auth/google', auth.loginUser);
// router.get('/auth/google/callback', auth.redirectUser);

router.get('/auth/google', cors(corsOptions),
  passport.authenticate('google', {scope: ["profile", "email", "https://www.googleapis.com/auth/user.birthday.read"]}),
           function(req, res){
             console.log("Req:  " + req);
           });
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    req.session.save(function() {
      console.log("USer reQ: " + req.user);
      res.redirect('/account');
    });
  });
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// USERS API
router.get('/api/users', db.getAllUsers);
router.get('/api/users/:id', db.getSingleUser);
router.post('/api/users', db.createUser);
router.put('/api/users/:id', db.updateUser);
router.delete('/api/users/:id', db.removeUser);

// INSTRUMENTS API
router.get('/api/instruments', db.getAllInstruments);
router.get('/api/instruments/:id', db.getSingleInstrument);
router.post('/api/instruments', db.createInstrument);
router.put('/api/instruments/:id', db.updateInstrument);
router.delete('/api/instruments/:id', db.removeInstrument);

// USER + INSTRUMENT

// route.get('/api/users/instruments', db.getAllUsersWithInstr);
// route.get('/api/users/instruments/:instrumentId', db.getUsersWithSingleInstr);
// route.get('/api/users/:userId/instruments', db.getAllInstrForUser);
// route.post('/api/users/:userId/instruments/:instrumentId', db.createInstrForUser);
// route.put('/api/users/:userId/instruments/:instrumentId', db.updateInstrForUser);
// route.delete('/api/users/:userId/instruments/:instrumntId', db.removeInstrForUser);

module.exports = router;

//Test Authentication (Google, FB, Twitter, etc. Logins)
function ensureAuthenticated(req, res, next) {
  console.log("User REQ ensure: " + req.user);
  if (req.isAuthenticated())
   return next();
  res.redirect('/login');
}
