
exports.up = function(knex, Promise) {
  return knex.schema
  .raw("ALTER TABLE wiseups ADD COLUMN fixed_date timestamp with time zone;")
};

exports.down = function(knex, Promise) {
  return knex.schema
  .raw("ALTER TABLE wiseups DROP COLUMN fixed_date;")
};
