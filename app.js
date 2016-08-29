'use strict';

require('dotenv').config();
var express = require('express'),
logger = require('morgan'),
bodyParser = require('body-parser'),
expressJWT = require('express-jwt'),
jwt = require('jsonwebtoken'),
cors = require('cors'),
knex = require('./db/knex'),
app = express(),
http = require('http').Server(app),
bcrypt = require('bcrypt');

var port = process.env.PORT || 3000;





// middleware

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

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
