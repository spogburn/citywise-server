'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var request = require('request');

// router.get('/', function(req, res, next){
//   res.send("<a href='/oauth/google'><button>Click Here To Authenticate</button></a>")
// })

router.post('/jwt-test', function(req, res, next){
  console.log('request body should have jwt:', req.body);
  res.end();
})

router.post('/google-login', function(req, res, next){
  return request('https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + req.body.access_token, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // turns the body string into a json object
        body = JSON.parse(body)
        // sets email into the profile
        var profile = {
          email: body.email
        }
        // sign and send back the JWT here
        var token = jwt.sign(profile, process.env.SECRET);

        res.json({token: token, profile: profile});

      } else {
        res.json('there was an error');
      }
})

})

// router.post('/admin/signup', function(req, res, next){
//     var adminData = {};
//     bcrypt.hash(req.body.password, 10, function(err, hash){
//       if (err) {
//         res.json({
//           message: 'Password parsing error!'
//         });
//       } else {
//         knex('cities').insert({
//           name: req.body.name,
//           admin_email: req.body.admin_email,
//           admin_password: hash,
//         })
//         .returning('*')
//         .then(function(data){
//           adminData = data[0]
//         })
//         .then(function() {
//           var token = jwt.sign(adminData, process.env.SECRET);
//           res.status(200);
//           res.json({
//             token: token,
//             user: adminData
//           });
//         })
//         .catch(function(err) {
//           res.json({
//             message: 'Error! ' + err
//           });
//         });
//       }
//     })
//   });
// })


router.post('/admin/login', function(req, res, next){
  console.log('body', req.body);
  var email = req.body.email;
  console.log(email);
  knex('admins').where('admin_email', '=', email)
  .then(function(user){
    console.log('userdata', user);
    user = user[0];
    console.log('user', user);
    if (user){
      console.log('user:', user);
      bcrypt.compare(req.body.password, user.admin_password, function(err, result){
        if (result){
          delete user.admin_password;
            var token = jwt.sign(user, process.env.SECRET);
            res.status(200).json({
              status: 'success',
              token: token,
              //don't delete this user, we need it!
              user: user
            });
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
