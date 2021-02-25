const express = require('express');
// const { check } = require('express-validator');

const loginRouter = require('./login-router');
const registrationRouter = require('./registration-router');
const userRouter = require('./user-router');
const authMiddleware = require('../middleware/auth-middleware');

const router = express.Router();
router.use(
  '/registration',
  // [
  //   check('username', 'The user name cannot be empty').notEmpty,
  //   check('password', 'The password must be between 4 and 10 characters long').isLength({ min: 4, max: 10 }),
  // ],
  registrationRouter
);
router.use('/login', loginRouter);
router.use('/user', authMiddleware, userRouter);

module.exports = router;
