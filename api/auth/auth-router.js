// build user router here
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Auth = require('./auth-model.js');
const { JWT_SECRET } = require('../auth/secrets/secrets.js');
const { 
  restricted,
  checkPayload,
  checkUsernameUnique,
  checkLoginPayload,
} = require('./auth-middleware.js');

// GET /api/auth/users - get all users in database, used to test GET and to verify users are being added to database correctly -- will only work if user is authorized and token is valid
router.get('/', restricted, (req, res, next) => {
  Auth.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next);
});

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

router.post('/login', checkPayload, checkLoginPayload, (req, res, next) => {
  let verifiedUser = bcrypt.compareSync(req.body.password, req.userData.password);

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

router.post('/logout', async (req, res, next) => {
  try {
    // const user = await Auth.findById(req.params.user_id);
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await Auth.findById(decoded.subject);
    // user.tokens = user.tokens.filter(token => token.token !== decoded.token);

    user.token = null;
    await user.save();
    res.status(200).json({ message: 'Successfully logged out' });
  } catch (err) {
    next(err);
    // res.status(500).json({ message: 'Failed to log out' });
  }
  // try {
  //   req.session.destroy((err) => {
  //     if (err) {
  //       next(err)
  //     } else {
  //       res.status(204).end();
  //     }
  //   });
  // } catch (err) {
  //   next(err);
  // }
});

function generateToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = router;