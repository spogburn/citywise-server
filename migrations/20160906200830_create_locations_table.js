
exports.up = function(knex, Promise) {
  return knex.schema.createTable('locations', function(table){
    table.increments();
    table.string('city_name');
    table.string('state_abbr');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('locations')
};
