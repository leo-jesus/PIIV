const jwt = require("express-jwt"); //analisa tokem com segredo e verifica se o usuário é válido. se autorizado, taca pau, se não, deleta user
const { token } = require("morgan");

const secret = require("../config").secret;

function getTokenFromHeader(req) {
  if (!req.headers.authorization) return null;
  consttoken = req.headers.authorization.split(" ");
  if (token[0] !== "Ecommerce") return null;
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
