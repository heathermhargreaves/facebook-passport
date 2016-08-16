var express = require('express');
var session = require('express-session');
var passport = require('passport');
var facebookStrategy = require('passport-facebook').Strategy;
var myKeys = require('./keys');

passport.use(new facebookStrategy({
    clientID: myKeys.facebookKey,
    clientSecret: myKeys.facebookSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, next) {
    return next(null, profile);
}));

var app = express();
app.use(session({secret: 'hello12345'}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/me',
    failureRedirect: '/'
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/me', function(req, res, next) {
  res.send(req.user);
});

app.listen(3000);
