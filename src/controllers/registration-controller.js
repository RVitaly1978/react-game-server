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

    const { email, password } = req.body;

    const candidate = await User.findOne({ email });
    if (candidate) {
      return next(ApiError.badRequest('Registration error: a user with this email already exists'));
    }

    const hashPassword = bcrypt.hashSync(password, HASH_SALT);
    const user = new User({ email, password: hashPassword });

    await user.save();

    return res.json({ message: 'The user is registered successfully' });
  } catch (e) {
    return next(ApiError.badRequest('Registration error'));
  }
};
