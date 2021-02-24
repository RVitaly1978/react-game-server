const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ApiError = require('../error/api-error');

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const TOKEN_EXPIRES_IN = '24h';

const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, TOKEN_SECRET_KEY, { expiresIn: TOKEN_EXPIRES_IN});
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return next(ApiError.badRequest(`The user ${username} is not found`));
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return next(ApiError.badRequest('The password is invalid'));
    }

    const token = generateAccessToken(user._id);
    return res.json({ token });
  } catch (e) {
    return next(ApiError.badRequest('Login error'));
  }
};
