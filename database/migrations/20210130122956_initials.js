
exports.up = async function (knex) {
    await knex.schema.createTable("users", (table) => {
      table.increments("id");
      table.string("name").notNull().defaultTo("Token User");
      table.string("username", 128).notNull().unique();
      table.string("password", 128).notNull();
      
    });

    await knex.schema.createTable("howtoz", (table) => {
        table.increments("id");
        
        table.string("tile", 128).notNull();
        table.string("image_url").defaultTo("");
        table.string("Description",255).notNull();
        
      });
    }
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users");
    await knex.schema.dropTableIfExists("howtoz");
};
