const users = [
  { username: 'Jake', password: 'pw12345' },
  { username: 'Melissa', password: 'pwabc' },
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
  { recipe_title: 'Meatless Spaghetti', recipe_source: "Nanna", image: "https://iwashyoudry.com/wp-content/uploads/2020/03/Homemade-Marinara-Sauce-3-500x500.jpg", user_id: 1, category_id: 3, 
  instructions: '1. Simmer tomato sauce or pasta sauce over medium-low heat, 2. While sauce is simmering, chop fresh tomatoes and add to sauce, along with italian seasoning or oregano and minced garlic; salt and pepper to taste, 3. Boil pasta to desired firmness, 4. Serve sauce over pasta and add parmesan cheese if desired.',
  ingredients: '1 tablespoon olive oil, 1/2 teaspoon garlic powder, 1/2 teaspoon dried oregano, 1/2 teaspoon dried basil, 1/2 teaspoon dried parsley, 1/2 teaspoon salt, 1/2 teaspoon pepper, 1 pound spaghetti, 1 pound fresh tomatoes, 1/2 cup parmesan cheese, 1/2 cup fresh basil, 1/2 cup fresh parsley, 1/2 cup tomato sauce, 1/2 cup pasta sauce, 1/2 cup italian seasoning, 1/2 cup parmesan cheese'
  },
  { recipe_title: 'French Toast', recipe_source: "Aunt Mabel",         image: "https://tastesbetterfromscratch.com/wp-content/uploads/2018/04/French-Toast-4-500x375.jpg", user_id: 1, category_id: 1,
  instructions: '1. Whisk eggs, sugar and cinnamon in a medium bowl, 2. Dip bread slices in the egg mixture, 3. Cook in pan over medium-high heat until egg wash is cooked through, 4. Serve with butter, syrup or fresh fruit',
  ingredients: '2 eggs, 1/2 cup sugar, 2 tbsp cinnamon, 4 slices of bread',
  },
  { recipe_title: 'Simple Pound Cake', recipe_source: "Aunt Jen", image: "https://www.onceuponachef.com/images/2018/01/Pound-Cake_.jpg", user_id: 2, category_id: 5, 
  instructions: 'Preheat oven to 350 degrees F. Line a baking sheet with parchment paper. In a medium bowl, whisk together the flour, baking soda, baking powder, and salt. In a separate bowl, whisk together the butter, brown sugar, and vanilla. Add the dry ingredients to the wet ingredients and whisk until combined. Stir in the eggs one at a time, mixing until each egg is incorporated. Stir in the milk and vanilla. Pour the batter into the prepared baking sheet. Bake in the preheated oven until a toothpick inserted in the center comes out clean, about 30 minutes. Cool on a wire rack. Store in an airtight container for up to 1 month.',
  ingredients: '1 cup all-purpose flour, 1/2 teaspoon baking soda, 1/2 teaspoon baking powder, 1/2 teaspoon salt, 1 cup unsalted butter, 1 cup granulated sugar, 1 tsp vanilla extract, 2 large eggs, 1 cup whole milk, 1 tsp vanilla extract',
  },
  { recipe_title: 'Chicken Stir Fry', recipe_source: "Granpa Ben", image: "https://www.wellplated.com/wp-content/uploads/2019/07/Ginger-Teriyaki-Chicken-Stir-Fry.jpg", user_id: 2, category_id: 7, 
  instructions: 'Preheat oiled skillet or wok over medium-high heat. Add chicken and cook until golden brown, about 5 minutes. Add vegetables and cook until tender, about 5 minutes. Server with rice.',
  ingredients: '2 tbsp cooking oil, 1 lb chicken, 2 cups stir-fry vegetables, 2 cups rice.'
  }
]

exports.seed = async function(knex) {
  await knex('users').insert(users);
  await knex('categories').insert(categories);
  await knex('recipes').insert(recipes);
};
