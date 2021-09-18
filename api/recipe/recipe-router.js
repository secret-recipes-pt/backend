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

router.get('/:recipe_id', restricted, checkRecipeId, (req, res) => {
  Recipe.findById(req.params.recipe_id)
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error retrieving recipe',
        error: err
    });
  });
});

router.post('/', restricted, checkPayload, async (req, res, next) => {
  try {
    const newRecipe = await Recipe.add(req.body);
    newRecipe.user_id = req.params.user_id;
    // const recipe = await Recipe.add(req.body);
    res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
});

router.put('/:recipe_id', restricted, checkRecipeId, checkPayload, (req, res) => {
  const changes = req.body;

  Recipe.update(req.params.recipe_id, changes)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error updating recipe',
        error: err
    });
  });
});

router.delete('/:recipe_id', restricted, checkRecipeId, (req, res) => {
  Recipe.remove(req.params.recipe_id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error deleting recipe',
        error: err
    });
  });
});

module.exports = router;