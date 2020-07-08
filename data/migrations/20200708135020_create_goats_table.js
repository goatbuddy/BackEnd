exports.up = function(knex, Promise) {
    return knex.schema.createTable("goats", tbl => {
      tbl.increments();
  
      tbl
      .integer('owner')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

      tbl.string("name", 255).notNullable();
      tbl.string("gender", 255);

      tbl
      .integer('mother')
      .unsigned()
      .references('id')
      .inTable('goats')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      tbl
      .integer('father')
      .unsigned()
      .references('id')
      .inTable('goats')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("goats");
  };