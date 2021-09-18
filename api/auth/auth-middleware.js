const Auth = require('./auth-model.js');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./secrets/secrets.js');

const restricted = (req, res, next) =>{
  const token = req.headers.authorization
  if (!token){
      res.status(401).json({message: "Token required; user is not authorized!"})
  } 
  else{
      jwt.verify(token, JWT_SECRET, (err, decoded) =>{
          if (err){
              res.status(401).json({message: "Token invalid! You shall not pass!"})
          }
          else {
              req.decodedToken = decoded
              next()
          }
      })
  }
}

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
      console.log(rows);
      next();
    } else if (!rows || user.password !== rows.password) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  restricted,
  checkPayload,
  checkUsernameUnique,
  checkLoginPayload,
};