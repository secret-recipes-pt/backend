
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
      tbl.string('recipe_title', 128).notNullable();
      tbl.string('recipe_source', 128).notNullable();
      tbl.string('image', 128);
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
    .createTable('instructions', tbl => {
      tbl.increments('instruction_id');
      tbl.integer('instruction_number', 200).notNullable();
      tbl.string('instruction_text', 355).notNullable();
      tbl.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipe_id')
        .inTable('recipes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('ingredients', tbl => {
      tbl.increments('ingredient_id');
      tbl.string('ingredient_name', 128).notNullable();
      tbl.string('ingredient_unit', 50);
    })
    .createTable('instruction_ingredients', tbl => {
      tbl.increments('instruction_ingredient_id');
      tbl.float('quantity', 128).notNullable();
      tbl.integer('instruction_id')
        .unsigned()
        .notNullable()
        .references('instruction_id')
        .inTable('instructions')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredient_id')
        .inTable('ingredients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists('instruction_ingredients')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('instructions')
    .dropTableIfExists('recipes')
    .dropTableIfExists('categories')
    .dropTableIfExists('users')
};
