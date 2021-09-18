
exports.up = async function(knex) {
  await knex.schema
    .createTable('users', tbl => {
      tbl.increments('user_id');
      tbl.string('username', 128).notNullable().unique();
      tbl.string('password', 128).notNullable();
    })
    .createTable('categories', tbl => {
      tbl.increments('category_id');
      tbl.string('category_name', 128).notNullable().unique();
    })
    .createTable('recipes', tbl => {
      tbl.increments('recipe_id');
      tbl.string('recipe_title', 355).notNullable();
      tbl.string('recipe_source', 355).notNullable();
      tbl.string('image', 955);
      tbl.string('ingredients', 5000).notNullable();
      tbl.string('instructions', 10000).notNullable();
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('category_id')
        .unsigned()
        .notNullable()
        .references('category_id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
};

exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists('recipes')
    .dropTableIfExists('categories')
    .dropTableIfExists('users')
};
