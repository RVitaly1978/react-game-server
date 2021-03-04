const bcrypt = require('bcryptjs');
const generateAccessToken = require('../utils/generateAccessToken');
const { validationResult } = require('express-validator');

const User = require('../models/user');
const Setting = require('../models/setting');
const Option = require('../models/option');
const ApiError = require('../error/api-error');

const HASH_SALT = Number(process.env.HASH_SALT);

exports.registration = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsMsg = errors.array().map(({ msg }) => msg).join('. ');
      return next(ApiError.badRequest(`Registration error: ${errorsMsg}`));
    }

    const { email, password, settings, options } = req.body;

    const candidate = await User.findOne({ email });
    if (candidate) {
      return next(ApiError.badRequest(`Registration error: a user '${email}' already exists`));
    }

    const hashPassword = bcrypt.hashSync(password, HASH_SALT);
    const user = new User({ email, password: hashPassword });
    await user.save();

    const setting = new Setting({ ...settings, owner: user._id });
    const option = new Option({ ...options, owner: user._id });
    await setting.save();
    await option.save();

    const token = generateAccessToken(user._id, email);
    return res.json({ token });
  } catch (e) {
    return next(ApiError.badRequest('Registration error'));
  }
};
