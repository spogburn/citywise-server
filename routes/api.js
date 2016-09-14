'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


router.post('/city-wise', function(req,res,next){
  var wiseup = {
    category: req.body.category,
    issue: req.body.issue,
    photo_url: req.body.photo_url,
    user_email: req.body.user_email,
    lat: req.body.lat,
    long: req.body.long
  }
  knex('locations').where({city_name: req.body.city, state_abbr: req.body.state})
  .then(function(data){
    if(data.length === 0){
      console.log("data when city doesn't exist:", data);
      knex('locations').insert({city_name: req.body.city, state_abbr: req.body.state})
      .returning('id')
      .then(function(id){
      wiseup.city_id = id;
      knex('wiseups').insert(wiseup).returning("*")
      })
      .then(function(data){
        res.json(data);
      })
    }
    else {
      console.log('the city exists and here is the data:', data[0]);
      wiseup.city_id = data[0].id;
      console.log('wiseup:', wiseup);
      knex('wiseups').insert(wiseup).returning("*")
      .then(function(data){
        console.log('data', data);
        res.json(data);
      })
    }
  })
  .catch(function(err){
    res.json(err);
  })
});

router.get('/city-wise', function(req, res, next){
  console.log('req user', req.user);
  var cityId = req.user.city_id
  console.log('cityId', cityId);
  knex('wiseups').where('city_id', '=', cityId)
  .then(function(data){
    console.log('data', data);
    res.json(data)
  })
  .catch(function(err){
    res.json(err)
  })
})

router.put('/city-wise/:id/fixed', function(req, res, next){
  console.log('params', req.params.id);
  knex('wiseups').where('id', '=', req.params.id)
  .update({is_fixed: true}).returning('*')
  .then(function(data){
    console.log('fixed data', data);
    res.json(data);
  })
  .catch(function(err){
    res.status(500).json({error:err})
  })
});

router.put('/city-wise/:id/archive', function(req, res, next){
  console.log('params', req.params.id);
  knex('wiseups').where('id', '=', req.params.id)
  .update({is_archived: true, archived_date: knex.fn.now()}).returning('*')
  .then(function(data){
    console.log('fixed data', data);
    res.json(data);
  })
  .catch(function(err){
    res.status(500).json({error:err})
  })
});

module.exports = router;
