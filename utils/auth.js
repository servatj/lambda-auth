const jwt = require('jsonwebtoken');

function generateToken(userInfo) {
  if (!userInfo) {
    return null;
  }

  return jwt.sign(userInfo, process.JWT_SECRET,{
    expiresIn: '1h'
  });
}

function verifyToken(username, token) {
  return jwt.verify(token, process.JWT_SECRET, (error, response) => {
    if (error) {
      return {
        verified: false,
        message: 'invalid token'
      }
    }

    if (response.username !== username) {
      return {
        verified: false,
        message: 'Invalid user'
      }
    }

    return {
      verified: true,
      message: 'valid token'
    }
  })
}

module.exports = {
  generateToken,
  verifyToken
}
