// server code goes here, need to require it in index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();

// building out routes
const restrict = require('./auth/auth-middleware.js')
const authRouter = require('./auth/auth-router.js');
const recipesRouter = require('./recipe/recipe-router.js');

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/recipes', restrict, recipesRouter);
server.use('/api/auth', restrict, authRouter);

server.get('/', (req, res) => {
  res.json({ api: 'API is UP!' });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
});

module.exports = server;