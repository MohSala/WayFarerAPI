const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  let {token} = req.body

  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      status: 401,
      error: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
};