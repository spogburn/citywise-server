'use strict';

exports.seed = function(knex, Promise) {
  return knex('cities').del()
  .then(function () {
      return Promise.all([
        knex('cities').insert({name: 'Fort Collins'}),
        knex('cities').insert({name: 'Boulder'}),
        knex('cities').insert({name: 'Denver'}),
        knex('cities').insert({name: 'Colorado Springs'})
      ])
  });
};
