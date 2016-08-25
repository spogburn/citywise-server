'use strict';

require('dotenv').config();
var express = require('express'),
logger = require('morgan'),
bodyParser = require('body-parser'),
expressJWT = require('express-jwt'),
jwt = require('jsonwebtoken'),
cors = require('cors'),
knex = require('./db/knex'),
passport = require('passport'),
GoogleStrategy = require('passport-google-oauth20').Strategy,
app = express(),
http = require('http').Server(app),
cookieSession = require('cookie-session'),
bcrypt = require('bcrypt');

var port = process.env.PORT || 3000;





// middleware

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieSession({
    name: 'Session',
    keys: [
        process.env.KEY_ONE,
        process.env.KEY_TWO,
        process.env.KEY_THREE
    ]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    //later this will be where you selectively send to the browser an identifier for your user, like their primary key from the database, or their ID from Google
    // console.log('serializeUser');
    // console.log(user);
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    // knex('users').where({
    //     username: profile.username
    // });
    console.log('deserializeUser');
    done(null, obj);
});

passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/oauth/google/callback',
      passReqToCallback   : true
      },
      function(req, accessToken, refreshToken, profile, done) {
       profile.accessToken = accessToken;
       console.log('accessToken: ', profile.accessToken);
       req.session.exist = true;
       return done(null, profile);
       })
      );

var oauth = require('./routes/oauth');
var api = require('./routes/api');
var index = require('./routes/index')
app.use('/', index)

app.use('/oauth', oauth);
// app.use('/api', expressJWT({
//   secret: process.env.SECRET
// }), api);
app.use('/api', api)

//unauthorized error handler
app.use(function(err, req, res, next) {
  console.log("ERR ", err);
  if (err.status === 401) {
    res.status(401).send({
      message: 'Invalid Token or Unauthorized',
      status: 401,
      error: err.inner.message
    });
  } else {
    next();
  }
});

// error handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found'); 
  err.status = 404; 
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') { 
  app.use(function(err, req, res, next) {  
    res.status(err.status || 500).json(err); 
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) { 
  res.status(err.status || 500);
});

http.listen(port, function() {

  console.log("Server listening on: ", port);
});
