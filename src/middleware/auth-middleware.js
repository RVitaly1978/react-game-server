const jwt = require('jsonwebtoken');

const ApiError = require('../error/api-error');

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return next(ApiError.unauthorized('Auth error: the user is not authorized'));
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      return next(ApiError.unauthorized('Auth error: the user is not authorized'));
    }

    const decodedData = jwt.verify(token, TOKEN_SECRET_KEY);
    req.user = decodedData;

    next();
  } catch (e) {
    return next(ApiError.unauthorized('Auth error: the user is not authorized'));
  }
};
