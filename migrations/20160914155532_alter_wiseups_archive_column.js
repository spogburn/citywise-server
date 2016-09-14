
exports.up = function(knex, Promise) {
  return knex.schema
  .raw("ALTER TABLE wiseups ADD COLUMN is_archived boolean DEFAULT false;")
  .raw("ALTER TABLE wiseups ADD COLUMN archived_date timestamp with time zone;")
};

exports.down = function(knex, Promise) {
  return knex.schema
  .raw("ALTER TABLE wiseups DROP COLUMN archived_date")
  .raw("ALTER TABLE wiseups DROP COLUMN is_archived;")
};
