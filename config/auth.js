var GoogleStrategy = require('passport-google-oauth2').Strategy;
var config = require('./oauth.js');
var passport = require('passport');
var db = require('../db/index');
const util = require('util');

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(id, done) {
    db.getSingleUserById(id, function(err, user) {
      if (!err || !null) {
        return done(null, user);
      }
      else return done(err, null);
    });
});

passport.use(new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL,
  passReqToCallBack: true
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile.id);
    console.log(profile.email);
    db.getSingleUserByEmail(profile.email, function(err, user) {
        console.log("USER:  " + user)
        if (err) {
          console.log(err);
        }
        if (!err && user !== null) {
          return done(null, user);
        } else {
          db.createUser(profile, function(err, user){
            if (err) {
              console.log(err);
            }
            return done(null, user);
          });
        };
      });
    // process.nextTick(function () {
    //   return done(null, profile);
    // });
  }
));
