const jwt = require('jsonwebtoken');

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const TOKEN_EXPIRES_IN = '24h';

const generateAccessToken = (id, email) => {
  const payload = { id, email };
  return jwt.sign(payload, TOKEN_SECRET_KEY, { expiresIn: TOKEN_EXPIRES_IN});
};

module.exports = generateAccessToken;
