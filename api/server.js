// server code goes here, need to require it in index.js
const express = require('express');
const server = express();

// building out routes
const usersRouter = require('./user/router.js');
const recipesRouter = require('./recipe/router.js');

server.use(express.json());

server.use('/api/recipes', recipesRouter);
server.use('/api/users', usersRouter);

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
});

module.exports = server;