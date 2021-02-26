const express = require('express');
const loginControllers = require('../controllers/login-controller');

const loginRouter = express.Router();

loginRouter.post('/', loginControllers.login);
loginRouter.get('/auth', loginControllers.check);

module.exports = loginRouter;
