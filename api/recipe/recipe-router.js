//build recipe router here
const router = require('express').Router();
const Recipe = require('./recipe-model.js');
const { restricted, checkRecipeId, checkPayload, } = require('../recipe/recipe-middleware.js');

router.get('/', restricted, (req, res) => {
  Recipe.find(req.query)
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error retrieving recipes',
        error: err
    });
  });
});

router.post('/:user_id', restricted, checkPayload, (req, res, next) => {
  const { user_id } = req.params;
  const { recipe_title, recipe_source, image, category_id } = req.body;
  const newRecipe = {
    recipe_title,
    recipe_source,
    image,
    category_id,
    user_id
  };
  Recipe.add(newRecipe)
    .then(recipe => {
      res.status(201).json(recipe);
      next();
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error adding recipe',
        error: err
    });
  });
});

module.exports = router;