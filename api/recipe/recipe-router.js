//build recipe router here
const router = require('express').Router();
const Recipe = require('./recipe-model.js');

router.get('/', (req, res) => {
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

module.exports = router;