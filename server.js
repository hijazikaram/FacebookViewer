var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser')
var passport = require('passport')
var keys = require('./keys')
var FacebookStrategy = require('passport-facebook').Strategy;


passport.use(new FacebookStrategy({
  clientID: keys.facebookKey,
  clientSecret: keys.facebookSecret,
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, userProfile, done) {
  return done(null, userProfile);
}));

var app = express();
app.use(session({secret: 'watsup'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
successRedirect: '/me',
failureRedirect: '/auth/facebook'
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


app.get('/me', function (req, res) {
  res.send(req.user)
})

app.listen('3000', function () {
  console.log('server working')
})
