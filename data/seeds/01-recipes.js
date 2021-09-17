const users = [
  { username: 'Jake', password: 'pw12345' },
  { username: 'Melissa', password: 'pw12345' },
]

const categories = [ 
	{ category_name: 'Breakfast and Brunch Recipes' }, // category_id: 1
	{ category_name: 'Appetizer/Snack Recipes' }, // category_id: 2
	{ category_name: 'Main Dish Recipes' },	// category_id: 3
	{ category_name: 'Salad Recipes' }, // category_id: 4
	{ category_name: 'Dessert Recipes' }, // category_id: 5
	{ category_name: 'Healthy Recipes' }, // category_id: 6
	{ category_name: 'World Cuisine' } // category_id: 7
]

const recipes = [
  { recipe_title: 'Meatless Spaghetti', recipe_source: "Nanna", user_id: 1, category_id: 3 },
  { recipe_title: 'French Toast', recipe_source: "Aunt Mabel", user_id: 1, category_id: 1 },
  { recipe_title: 'Simple Shortbread', recipe_source: "Aunt Jen", user_id: 2, category_id: 5 },
  { recipe_title: 'Chicken Stir Fry', recipe_source: "Granpa Ben", user_id: 2, category_id: 7 }
]

const instructions = [
  { recipe_id: 1, instruction_number: 1, instruction_text: '1. Simmer tomato sauce or pasta sauce over medium-low heat' }, // instruction_id: 1
  { recipe_id: 1, instruction_number: 2, instruction_text: '2. While sauce is simmering, chop fresh tomatoes and add to sauce, along with italian seasoning or oregano and minced garlic; salt and pepper to taste.' }, // instruction_id: 2
  { recipe_id: 1, instruction_number: 3, instruction_text: '3. Boil pasta to desired firmness.' }, // instruction_id: 3
  { recipe_id: 1, instruction_number: 4, instruction_text: '4. Serve sauce over pasta and add parmesan cheese if desired.' }, // instruction_id: 4
  { recipe_id: 2, instruction_number: 1, instruction_text: '1. Whisk eggs, sugar and cinnamon in a medium bowl' }, // instruction_id: 5
  { recipe_id: 2, instruction_number: 2, instruction_text: '2. Dip bread slices in the egg mixture.' }, // instruction_id: 6
  { recipe_id: 2, instruction_number: 3, instruction_text: '3. Cook in pan over medium-high heat until egg wash is cooked through.' }, // instruction_id: 7
  { recipe_id: 2, instruction_number: 4, instruction_text: '4. Serve with butter, syrup or fresh fruit' }, // instruction_id: 8
  { recipe_id: 3, instruction_number: 1, instruction_text: '1. Preheat oven to 350 degrees F.' }, // instruction_id: 9
  { recipe_id: 3, instruction_number: 2, instruction_text: '2. In a large bowl, mix together the flour, baking powder, baking soda, salt and sugar.' }, // instruction_id: 10
  { recipe_id: 3, instruction_number: 3, instruction_text: '3. In a large bowl, beat together the butter, brown sugar, eggs and vanilla until smooth.' }, // instruction_id: 11
  { recipe_id: 3, instruction_number: 4, instruction_text: '4. Add dry ingredients to wet ingredients and stir to combine.' }, // instruction_id: 12
  { recipe_id: 3, instruction_number: 5, instruction_text: '5. Pour batter into ungreased pans.' }, // instruction_id: 13
  { recipe_id: 3, instruction_number: 6, instruction_text: '6. Bake in preheated oven for about 10 minutes or until a toothpick inserted in the center comes out clean.' }, // instruction_id: 14
  { recipe_id: 4, instruction_number: 1, instruction_text: '1. Preheat oiled skillet or wok over medium-high heat.' }, // instruction_id: 15
  { recipe_id: 4, instruction_number: 2, instruction_text: '2. Add chicken and cook until golden brown, about 5 minutes.' }, // instruction_id: 16
  { recipe_id: 4, instruction_number: 3, instruction_text: '3. Add vegetables and cook until tender, about 5 minutes.' }, // instruction_id: 17
  { recipe_id: 4, instruction_number: 4, instruction_text: '4. Serve with rice or  beans.' } // instruction_id: 18

]

const ingredients = [
  { ingredient_name: 'tomato sauce' },
  { ingredient_name: 'fresh tomatoes, italian seasoning or minced garlic and oregano' },
  { ingredient_name: 'pasta' },
  { ingredient_name: 'eggs' },
  { ingredient_name: 'sugar' },
  { ingredient_name: 'cinnamon' },
  { ingredient_name: 'bread' }, // ingredients_id: 7
  { ingredient_name: 'flour' }, // ingredient_id: 8
  { ingredient_name: 'baking powder' }, // ingredient_id: 9
  { ingredient_name: 'baking soda' }, // ingredient_id: 10
  { ingredient_name: 'salt' },  // ingredient_id: 11
  { ingredient_name: 'sugar' }, // ingredient_id: 12
  { ingredient_name: 'butter' }, // ingredient_id: 13
  { ingredient_name: 'brown sugar' }, // ingredient_id: 14
  { ingredient_name: 'eggs' }, // ingredient_id: 15
  { ingredient_name: 'vanilla extract' }, // ingredient_id: 16
  { ingredient_name: 'cooking oil' }, // ingredient_id: 17
  { ingredient_name: 'chicken' }, // ingredient_id: 18
  { ingredient_name: 'stir-fry vegetable mix' }, // ingredient_id: 19
]

const instruction_ingredients = [
  { instruction_id: 1, ingredient_id: 1 , quantity: '1/2 cup' },
  { instruction_id: 2, ingredient_id: 2 , quantity: '1/2 cup' },
  { instruction_id: 3, ingredient_id: 3 , quantity: '20 oz' },
  { instruction_id: 5, ingredient_id: 4 , quantity: '2' },
  { instruction_id: 5, ingredient_id: 5 , quantity: '1/2 cup' },
  { instruction_id: 5, ingredient_id: 6 , quantity: '1/2 tbsp' },
  { instruction_id: 6, ingredient_id: 7 , quantity: '4 slices' },
  { instruction_id: 10, ingredient_id: 8 , quantity: '22 cup' },
  { instruction_id: 10, ingredient_id: 9 , quantity: '1/2 tsp' },
  { instruction_id: 10, ingredient_id: 10 , quantity: '1/2 tsp' },
  { instruction_id: 10, ingredient_id: 11 , quantity: '1/2 tsp' },  
  { instruction_id: 10, ingredient_id: 12 , quantity: '1/2 cup' },
  { instruction_id: 11, ingredient_id: 13 , quantity: '6 tbsp' },
  { instruction_id: 11, ingredient_id: 14 , quantity: '1/2 cup' },
  { instruction_id: 11, ingredient_id: 15 , quantity: '4' },
  { instruction_id: 11, ingredient_id: 16 , quantity: '1/2 tsp' },
  { instruction_id: 15, ingredient_id: 17 , quantity: '4 tbsp' },
  { instruction_id: 16, ingredient_id: 18 , quantity: '1 lb' },
  { instruction_id: 17, ingredient_id: 19 , quantity: '2 cups' },
]

exports.seed = async function(knex) {
  await knex('users').insert(users);
  await knex('categories').insert(categories);
  await knex('recipes').insert(recipes);
  await knex('instructions').insert(instructions);
  await knex('ingredients').insert(ingredients);
  await knex('instruction_ingredients').insert(instruction_ingredients);  
};
