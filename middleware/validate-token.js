const jwt = require('jsonwebtoken');
TOKEN_SECRET = 'mytoken'

// Middleware to validate token

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if(!token){
    return res.status(401).json({error: "Access Denied"});
  }
  try {
    const verified = jwt.verify(token, TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({error: "Token is not valid"});
  }
};

module.exports = verifyToken;