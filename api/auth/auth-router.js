// build user router here
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Auth = require('./auth-model.js');
const { JWT_SECRET } = require('../auth/secrets/secrets.js');
const { 
  checkPayload,
  checkUsernameUnique,
  checkLoginPayload,
} = require('./auth-middleware.js');

router.post('/register', checkPayload, checkUsernameUnique, (req, res, next) => {
  let user = req.body;

  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;

  Auth.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(next);
});

router.post('/login', checkLoginPayload, (req, res, next) => {
  const verifiedUser = bcrypt.compareSync(req.body.password, req.userData.password);

  if (verifiedUser) {
    const token = generateToken(req.userData);
    res.status(200).json({
      message: `Welcome ${req.userData.username}!`,
      token,
    });
    next();
  } else {
    res.status(401).json({ 
      message: 'Invalid Credentials' 
    });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = router;