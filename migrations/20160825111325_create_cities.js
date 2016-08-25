
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cities', function(table){
    table.increments();
    table.string('name');
    table.string('admin_email');
    table.string('admin_password');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cities');
};
