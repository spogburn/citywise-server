'use strict';

exports.up = function(knex, Promise) {
return knex.schema.createTable('fixits', function(table) {
  table.increments();
  table.string('city').notNullable();
  table.integer('city_id').references('cities.id')
  table.string('category').notNullable();
  table.text('issue').notNullable();
  table.string('photo_url');
  table.string('user_email')
  table.decimal('lat', 9, 6);
  table.decimal('long', 9, 6);
  table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  table.boolean('is_fixed').defaultTo(false);
})

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('fixits');

};

  // table.specificType('point', 'geometry(point, 4326)');
  // to insert looks like this: "point": "SRID=4326; POINT(-105.064833 40.548216)",
