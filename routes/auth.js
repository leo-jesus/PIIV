const jwt = require("express-jwt"); //analisa tokem com segredo e verifica se o usuário é válido. se autorizado, taca pau, se não, deleta user
const secret = require("../config").secret;

function getTokenFromHeader(req) {
  if (!req.headers.authorization) {
    return null;
  }
  const token = req.headers.authorization.split(" ");
  if (token[0] !== "Ecommerce") {
    return null;
  }
  return token[1];
}

const auth = {
  required: jwt({
    secret,
    userProperty: "payload",
    getToken: getTokenFromHeader,
  }),
  optional: jwt({
    secret,
    userProperty: "payload",
    credentialRequired: false,
    getToken: getTokenFromHeader,
  }),
};
module.exports = auth;
