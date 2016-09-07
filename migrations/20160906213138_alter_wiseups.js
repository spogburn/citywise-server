
exports.up = function(knex, Promise) {
  return knex.schema
  .raw("ALTER TABLE wiseups DROP COLUMN city;")
  .raw("ALTER TABLE wiseups DROP CONSTRAINT wiseups_city_id_foreign;")
  .raw("ALTER TABLE wiseups ADD CONSTRAINT wiseups_city_id_foreign FOREIGN KEY (city_id) REFERENCES locations(id)")
};

exports.down = function(knex, Promise) {
  return knex.schema
  .raw("ALTER TABLE wiseups DROP CONSTRAINT wiseups_city_id_foreign;")
  .raw("ALTER TABLE wiseups ADD CONSTRAINT wiseups_city_id_foreign FOREIGN KEY (city_id) REFERENCES cities(id);")
  .raw("ALTER TABLE wiseups ADD COLUMN city varchar(100);")
};
