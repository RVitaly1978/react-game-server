const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user');
const Setting = require('../models/setting');
const Option = require('../models/option');
const ApiError = require('../error/api-error');
const generateAccessToken = require('../utils/generateAccessToken');

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsMsg = errors.array().map(({ msg }) => msg).join('. ');
      return next(ApiError.badRequest(`Login error: ${errorsMsg}`));
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(ApiError.badRequest(`Login error: the user with ${email} is not found`));
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return next(ApiError.badRequest('The password is invalid'));
    }

    const settings = await Setting.findOne({ owner: user._id }).select('-_id -owner');
    const options = await Option.findOne({ owner: user._id }).select('-_id -owner');

    const token = generateAccessToken(user._id, email);
    return res.json({ token, settings, options });
  } catch (e) {
    return next(ApiError.badRequest('Login error'));
  }
};
