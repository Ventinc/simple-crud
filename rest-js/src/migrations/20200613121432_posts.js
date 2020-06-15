exports.up = function (knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("id");
    table.string("title").notNullable();
    table.text("content").notNullable();
    table.timestamps(false, true);
    table.integer("user_id").unsigned().notNullable();

    table.foreign("user_id").references("id").inTable("users");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
