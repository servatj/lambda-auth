const { buildResponse } = require('../utils/utils');
const { verifyToken } = require('../utils/auth');

function verify(requestBody) {
  if (!requestBody.user || !requestBody.user.username || !requestBody.token) {
    buildResponse(401, {
      verified: false,
      message: 'Verification failed, incorrect request body'
    })
  }

  const user = requestBody.user;
  const token = requestBody.token;

  const response = await verifyToken(user.username, token);

  if (!response.verified) {
    return buildResponse(403, { message: 'token invalid'})
  }

  return buildResponse(200, {
    verified: true,
    message: 'success',
    user: user,
    token: token
  });
}

module.exports = {
  verify
}
