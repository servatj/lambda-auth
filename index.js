const { buildResponse } = require('./utils/utils')
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
      response = await healthService.health();
      break;
    case event.httpMethod === "POST" && event.path === registerPath:
      const registerBody = JSON.parse(event.body);
      response = await registerService.register(registerBody);
      break;
    case event.httpMethod === "POST" && event.path === loginPath:
      const loginBody = JSON.parse(event.body);
      response = await loginService.login(loginBody);
      break;
    case event.httpMethod === "POST" && event.path === verifyPath:
      const verifyBody = JSON.parse(event.body);
      response = await verifyService(verifyBody);
      break;
  }
  return response;
};
