const Auth = require('./auth-model.js');

function checkPayload(req, res, next) {
  const user = req.body;
  if (!user.username || !user.password) {
    return res.status(400).json({ message: 'Missing username or password' });
  } else {
  next();
  }
}

async function checkUsernameUnique(req, res, next) {
  try {
    const rows = await Auth.findBy({ username: req.body.username });
    if (rows.length === 0) {
      next();
    } else {
      return res.status(400).json({ message: 'Username already exists' });
    }
  } catch (err) {
    next(err);
  }
}

async function checkLoginPayload(req, res, next) {
  const user = req.body;
  try {
    const rows = await Auth.findBy({ username: user.username });
    if (rows) {
      req.userData = rows;
      next();
    } else if (!rows || user.password !== rows.password) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkPayload,
  checkUsernameUnique,
  checkLoginPayload,
};