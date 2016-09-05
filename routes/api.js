'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/home', function(req, res, next){
  res.send("<h1>You Made It!!</h1>");
})


router.post('/city-wise', function(req,res,next){
  knex('wiseups').insert(req.body).returning('issue')
  .then(function(data){
    res.json(data)
  })
  .catch(function(err){
    console.log(err);
  })
});

router.get('/city-wise', function(req, res, next){
  knex('wiseups').where('city_id', '=', 'cities.id')
  .then(function(data){
    data = data[0];
    res.json(data)
  })
  .catch(function(err){
    console.log(err);
  })
})

router.put('/city-wise/:id', function(req, res, next){
  knex('wiseups').where('id', '=', req.body.id)
  .update({is_fixed: true}).returning('*')
  .then(function(data){
    res.json(data);
  })
  .catch(function(err){
    console.log(err);
  })
})

module.exports = router;
