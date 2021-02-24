const bcrypt = require('bcryptjs');
// const { validationResult } = require('express-validator');

const User = require('../models/user');
const ApiError = require('../error/api-error');

const HASH_SALT = Number(process.env.HASH_SALT);

exports.registration = async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   console.log(errors);
    //   return next(ApiError.badRequest('Registration error: '));
    // }

    const { username, password } = req.body;

    const candidate = await User.findOne({ username });
    if (candidate) {
      return next(ApiError.badRequest('Registration error: a user with this name already exists'));
    }

    const hashPassword = bcrypt.hashSync(password, HASH_SALT);
    const user = new User({ username, password: hashPassword });
    await user.save();

    return res.json({ message: 'The user is registered successfully' });
  } catch (e) {
    return next(ApiError.badRequest('Registration error'));
  }
};
