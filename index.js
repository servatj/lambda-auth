const registerService = require("./service/register");
const loginService = require("./service/login");
const verifyService = require("/service/verify");
const healthService = require("/service/health");

const healthPath = "/health";
const registerPath = "/register";
const loginPath = "/login";
const verifyPath = "/verify";

exports.handler = async (event) => {
  console.log("Request event", event);
  let response;
  switch (true) {
    case event.httpMethod === "GET" && event.path === healthPath:
      response = buildResponse(200);
      break;
    case event.httpMethod === "POST" && event.path === registerPath:
      const registerBody = JSON.parse(event.body);
      response = buildResponse(200);
      break;
    case event.httpMethod === "POST" && event.path === loginPath:
      const registerLogin = JSON.parse(event.body);
      response = buildResponse(200);
      break;
    case event.httpMethod === "POST" && event.path === verifyPath:
      const registerVerify = JSON.parse(event.body);
      response = buildResponse(200);
      break;
  }
  return response;
};

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
}
