exports.up = function(knex, Promise) {
    return knex.schema.createTable("users", tbl => {
      tbl.increments();
  
      tbl.string("username", 128).notNullable().unique();
      tbl.string("password", 255).notNullable();

      tbl.string("name", 255);
      tbl.string("phone", 255);
      tbl.string("email", 255);
      tbl.string("address", 500);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("users");
  };