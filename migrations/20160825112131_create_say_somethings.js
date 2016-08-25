'use strict';

exports.up = function(knex, Promise) {
return knex.schema.createTable('say_somethings', function(table) {
  table.increments();
  table.string('city').notNullable();
  table.integer('city_id').references('cities.id')
  table.string('category').notNullable();
  table.string('title').notNullable();
  table.text('comment').notNullable();
  table.string('photo_url');
  table.string('user_email')
  table.specificType('point', 'geometry(point, 4326)');
  table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  table.boolean('is_fixed').defaultTo(false);
})

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('say_somethings');

};
