const router = require('express').Router();
const Instructions = require('./instructions-model.js');
const Recipes = require('../recipe/recipe-model.js');
const Ingredients = require('../ingredients/ingredients-model.js');

router.get('/', (req, res, next) => {
  // wrote below code to get instructions based on recipe id but it is not working..find() will just pull all instructions for all recipes

  // const { recipe_id } = req.params.recipe_id;
  // if (!recipe_id) {
  //   res.status(400).json({ message: `No recipe found with ${recipe_id}` });
  // } else {
  // Instructions.find(recipe_id)
  //   .then(instructions => {
  //     res.status(200).json(instructions);
  //   })
  //   .catch(next);
  // }

  Instructions.find()
    .then(instructions => {
      res.status(200).json(instructions);
    })
    .catch(next);
}); 

// GET instruction by id
router.get('/:instruction_id', (req, res, next) => {
  const { instruction_id } = req.params;
  Instructions.findById(instruction_id)
    .then(instruction => {
      if (instruction) {
        res.status(200).json(instruction);
      } else {
        res.status(404).json({ message: `No instruction found with the id of ${instruction_id}` });
      }
    })
    .catch(next);
});

// POST new instruction
router.post('/', (req, res, next) => {
  // const { recipe_id } = req.params.recipe_id;
  const instruction = req.body;
  if (!instruction) {
    res.status(400).json({ message: 'No instruction provided' });
  } else {
    // instruction.recipe_id = recipe_id;
    Instructions.add(instruction)
      .then(instruction => {
        res.status(201).json(instruction);
      })
      .catch(next);
  }
});

// PUT update instruction
router.put('/:instruction_id', (req, res, next) => {
  const { instruction_id } = req.params;
  const changes = req.body;
  Instructions.findById(instruction_id)
    .then(instruction => {
      if (instruction) {
        Instructions.update(instruction_id, changes)
          .then(updatedInstruction => {
            res.status(200).json(updatedInstruction);
          })
          .catch(next);
        } else {
          res.status(404).json({ message: `No instruction found with the id of ${instruction_id}` });
        }
    })
    .catch(next);
});

// DELETE instruction
router.delete('/:instruction_id', (req, res, next) => {
  const { instruction_id } = req.params;
  Instructions.remove(instruction_id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ message: `Instruction ${instruction_id} was deleted` });
      } else {
        res.status(404).json({ message: `No instruction found with the id of ${instruction_id}` });
      }
    })
    .catch(next);
});

// Routes for ingredients
// GET all ingredients
router.get('/ingredients', (req, res, next) => {
  // const { instruction_id } = req.params;
  Ingredients.find()
    .then(ingredients => {
      if (ingredients) {
        res.status(200).json(ingredients);
      } else {
        res.status(404).json({ message: `No ingredients found` });
      }
    })
    .catch(next);
});

// GET ingredient by id
router.get(':instruction_id/ingredients/:ingredient_id', (req, res, next) => {
  const { instruction_id, ingredient_id } = req.params;
  if (instruction_id)
  Instructions.findById(ingredient_id)
    .then(ingredient => {
      if (ingredient) {
        res.status(200).json(ingredient);
      } else {
        res.status(404).json({ message: `No instruction found with the id of ${ingredient_id}` });
      }
    })
    .catch(next);
});

// POST new ingredient

// PUT update ingredient

// DELETE ingredient


module.exports = router;