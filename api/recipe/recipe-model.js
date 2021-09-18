const db = require('../../data/dbConfig.js');

module.exports = {
  find,
  findById,
  add,
  remove,
  update,
};

async function find() {

    const recipes = await db('recipes')
    .orderBy('recipe_id', 'asc');

    return recipes;

  // wrote the below code to get recipes with instructions listed below the recipe but was only listing one recipe and one instruction step ... commented out for now and left the general recipe query above which does not list specific instructions but DOES return a list of all recipes

  // const recipes = await db('recipes as r')
  //   .leftJoin('instructions as i', 'i.recipe_id', 'r.recipe_id')
    // .orderBy('r.recipe_id', 'asc');

//   const recipeResult = {
//       recipe_id: recipes[0].recipe_id,
//       recipe_name: recipes[0].recipes_name,
//       instructions: []
//     }
//   recipes.forEach(recipe => {
//     if (recipeResult.instruction_id) {
//       recipeResult.instructions.push({
//           instruction_id: recipe.instruction_id,
//           instruction_text: recipe.instruction_text,
//           instruction_number: recipe.instruction_number
//       })  
//     }
//  })
//     return recipeResult;
} 

async function findById(recipe_id) {
  // this code is just for listing the specific recipe info when queried by recipe_id...wrote query below that for instructions and ingredients to display on the specific recipe query page

  // return db('recipes')
  //   .where({ recipe_id })
  //   .first();
  
  const recipeInfo = await db('instruction_ingredients as ii')
    .join('instructions as i', 'i.instruction_id', 'ii.instruction_id')
    .leftJoin('ingredients as ing', 'ing.ingredient_id', 'ii.ingredient_id')
    .join('recipes as r', 'r.recipe_id', 'i.recipe_id')
    .where('r.recipe_id', recipe_id)
    .orderBy('i.instruction_id', 'asc')

  const recipeResult = {
    recipe_id: recipeInfo[0].recipe_id,
    recipe_name: recipeInfo[0].recipe_name,
      instructions: []
  }

    recipeInfo.forEach(recipe => {
      if (recipe.instruction_id) {
        recipeResult.instructions.push({
          instruction_id: recipe.instruction_id,
          instruction_number: recipe.instruction_number,
          instruction_text: recipe.instruction_text,
          ingredients: []
      })

      if (recipe.ingredient_id) {
        recipeResult.instructions[recipeResult.instructions.length - 1].ingredients.push({
          ingredient_id: recipe.ingredient_id,
          ingredient_name: recipe.ingredient_name,
          quantity: recipe.quantity
          })
        }
      }
    })
    // if (!recipeInfo.instruction_id || !recipeInfo.ingredient_id) {
    //   return db('recipes')
    //     .where({ recipe_id })
    //     .first();
    // } else {
    return recipeResult;
    // }

}

async function add(recipe) {
  const [id] = await db('recipes').insert(recipe).returning('recipe_id');

  return id;
}

function remove(recipe_id) {
  return db('recipes')
    .where({ recipe_id })
    .del();
}

function update(recipe_id, changes) {
  return db('recipes')
    .where({ recipe_id })
    .update(changes);
}