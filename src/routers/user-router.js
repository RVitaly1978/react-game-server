const express = require('express');
const userControllers = require('../controllers/user-controller');

const userRouter = express.Router();

userRouter.get('/', userControllers.getUsers);

module.exports = userRouter;