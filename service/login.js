const { buildResponse } = require('./utils/utils');
const bcrypt = require('bcryptjs');
const AWS = require('aws-sdk');
const { util } = require('chai');
AWS.config.update({
  region: 'us-east-1'
});
const auth = require('../utils/auth');

const dynamodb = new AWS.Dynamodb.DocumentClient();
const userTable = 'losttoy-users';

async function login({ username, password }) {
  if (!username, !password) {
    return buildResponse(401, { message: 'username and password required'});
  }

  const dynamoUser = await getUser(username);
  if (!dynamoUser || !dynamoUser.username) {
    return util.buildResponse(403, { message: 'user does not exist'})
  }

  if (!bcrypt.compareSync(password, dynamoUser.password)) {
    return buildResponse(403, { message: 'password is incorrect'})
  }

  const userInfo = {
    username: dynamoUser.username,
    name: dynamoUser.name
  }

  const token = auth.generateToken(userInfo);

  const response = {
    user: userInfo,
    token: token
  }

  return buildResponse(200, response);
}

async function getUser() {
  const params = {
    TableName: userTable,
    key: {
      username
    }
  }

  return await dynamodb.get(params).promise().then( response => {
    return response.Item;
  }, error => {
    console.error('There is an error saving user:', error);
  });
}

module.exports = {
  login
}
