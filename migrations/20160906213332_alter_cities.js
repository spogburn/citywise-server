
exports.up = function(knex, Promise) {
  return knex.schema
  .raw("ALTER TABLE cities RENAME TO admins;")
  .raw("ALTER TABLE admins ADD COLUMN city_id integer;")
  .raw("ALTER TABLE admins ADD CONSTRAINT admins_city_id_foreign FOREIGN KEY (city_id) REFERENCES locations(id);")
};

exports.down = function(knex, Promise) {
  return knex.schema
  .raw("ALTER TABLE admins DROP CONSTRAINT admins_city_id_foreign")
  .raw("ALTER TABLE admins DROP COLUMN city_id;")
  .raw("ALTER TABLE admins RENAME TO cities;")
};
