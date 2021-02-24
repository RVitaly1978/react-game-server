const express = require('express');
const loginControllers = require('../controllers/login-controller');

const loginRouter = express.Router();

loginRouter.get('/', loginControllers.login);

module.exports = loginRouter;
