'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex'),
var bcrypt = require('bcrypt')

// router.get('/', function(req, res, next){
//   res.send("<a href='/oauth/google'><button>Click Here To Authenticate</button></a>")
// })

router.post('/admin/signup', function(req, res, next){
  var adminData = {};
  bcrypt.hash(req.body.password, 10, function(err, hash){
    if (err) {
      res.json({
        message: 'Password parsing error!'
      });
    } else {
      knex('cities').insert({
        name: req.body.name,
        admin_email: req.body.email,
        admin_password: hash,
      })
      .returning('*')
      .then(function(data){
        adminData = data[0]
      })
      .then(function() {
        var token = jwt.sign(userdata, process.env.SECRET);
        res.status(200);
        res.json({
          token: token,
          user: userdata
        });
      })
      .catch(function(err) {
        res.json({
          message: 'Error! ' + err
        });
      });
    }
  })
});

router.post('/admin/login', function(req, res, next){
  knex(cities).where({email: req.body.email})
  .then(function(user){
    if (user){
      bcrypt.compare(req.body.password, user.password, function(err, result){
        if (result){
          delete user.password;
            var token = jwt.sign(user, process.env.SECRET);
            res.status(200).json({
              status: 'success',
              token: token,
              //don't delete this user, we need it!
              user: user
            });
            res.redirect('/api/say-something')
        }
        else {
          res.json({
            error: 'invalid username or password'
          });
        }
      })
    }
    else {
      res.json({
        error: 'looks like you need to sign up for an account'
      })
    }
  })
})



module.exports = router;
