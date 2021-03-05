const express = require('express');
const { check, oneOf } = require('express-validator');

const loginRouter = require('./login-router');
const registrationRouter = require('./registration-router');
const userRouter = require('./user-router');
const authMiddleware = require('../middleware/auth-middleware');

const router = express.Router();

const registrationFieldValidation = [
  check('email', 'The user email cannot be empty').notEmpty(),
  check('password', 'The password must be between 4 and 10 characters long').isLength({ min: 4, max: 10 }),
];

const loginFieldValidation = [
  check('email', 'The user email cannot be empty').notEmpty(),
  check('password', 'The user password cannot be empty').notEmpty(),
];

router.use('/registration', registrationFieldValidation, registrationRouter);
router.use('/login', loginFieldValidation, loginRouter);
router.use('/user', authMiddleware, userRouter);

module.exports = router;
