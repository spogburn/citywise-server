'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
//
// router.get('/home', function(req, res, next){
//   res.send("<h1>You Made It!!</h1>");
// })

router.post('/say-something', function(req,res,next){
  knex('say_somethings').insert(req.body).returning('title')
  .then(function(data){
    res.json(data)
  })
  .catch(function(err){
    console.log(err);
  })
});

router.get('/say-something', function(req, res, next){
  knex('say_somethings').where('city_id', '=', 'cities.id')
  .then(function(data){
    data = data[0];
    res.json(data)
  })
  .catch(function(err){
    console.log(err);
  })
})

router.put('/say-something/:id', function(req, res, next){
  knex('say_somethings').where('id', '=', req.body.id)
  .update({is_fixed: true}).returning('*')
  .then(function(data){
    res.json(data);
  })
  .catch(function(err){
    console.log(err);
  })
})

module.exports = router;
