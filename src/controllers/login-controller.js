const bcrypt = require('bcryptjs');

const User = require('../models/user');
const ApiError = require('../error/api-error');
const generateAccessToken = require('../utils/generateAccessToken');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(ApiError.badRequest(`The user with ${email} is not found`));
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return next(ApiError.badRequest('The password is invalid'));
    }

    const token = generateAccessToken(user._id, email);
    return res.json({ token });
  } catch (e) {
    return next(ApiError.badRequest('Login error'));
  }
};

exports.check = async (req, res, next) => {
  const { id, email } = req.user;

  const token = generateAccessToken(id, email);
  return res.json({ token });
};
