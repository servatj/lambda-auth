const { buildResponse } = require('./utils/utils');
const bcrypt = require('bcryptjs');
const AWS = require('aws-sdk')
AWS.config.update({
  region: 'us-east-1'
});

const dynamodb = new AWS.Dynamodb.DocumentClient();
const userTable = 'losttoy-users';

async function register(userInfo) {
  const name = userInfo.name;
  const email = userInfo.email;
  const username = userInfo.userName;
  const password = userInfo.password;

  if (!username || !name || !email || !password) {
    return buildResponse(401, {
      message: 'All fields are required'
    });
  }

  const dynamoUser = await getUser(username);
  if (dynamoUser && dynamoUser.username) {
    return buildResponse(401, {
      message: 'username already exists in our database. please choose a different user'
    })
  }

  const encryptedPW = bcrypt.hashSync(password.trim(), 10);
  const user = {
    name,
    email,
    username: username.toLowerCase().trim(),
    password: encryptedPW
  }

  const saveUserResponse = await saveUser(user);
  if (!saveUserResponse) {
    return buildResponse(503, {
      message: 'Server Error. Please try again later.'
    })
  }

  return buildResponse(200, { username })
}

async function getUser(username) {
  const params = {
    TableName: userTable,
    Key: {
      username
    }
  }

  return await dynamodb.get(params).promise().then( response => {
    return response.Item;
  }, error => {
    console.error('There is an error saving user:', error);
  })
}

async function saveUser(user) {
  const params = {
    TableName: userTable,
    Item: user
  }

  return await dynamodb.put(params).promise().then(() => {
    return true;
  }, error => console.error('there is an error saving user:', error));
}

module.exports = { register };
