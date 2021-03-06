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

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://frontend-lovat-sigma.vercel.app", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

router.post('/login', checkPayload, checkLoginPayload, async (req, res, next) => {
  try {
    const user = await Auth.findBy({ username: req.body.username });
    let verifiedUser = bcrypt.compareSync(req.body.password, req.userData.password);

  if (verifiedUser) {
    const token = generateToken(req.userData);
    res.status(200).json({
      message: `Welcome ${req.userData.username}!`,
      token,
      username: user.username,
      user_id: user.user_id
    });
    next();
  } else {
    res.status(401).json({ 
      message: 'Invalid Credentials' 
    });
  }
  } catch (error) {
    next(error);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    // const user = await Auth.findById(req.params.user_id);
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded) {
      req.headers.authorization = null;
      res.status(200).json({
        message: 'Logout successful'
      });
    } else {
      res.status(401).json({
        message: 'Invalid token'
      });
    }
  } catch (error) {
    next(error);
  }
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