function buildResponse(statusCode, body) {
  return {
    statusCode,
    Headers: {
      'Access-Control-Allow-Origin' : '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}

module.exports = {
  buildResponse
}
