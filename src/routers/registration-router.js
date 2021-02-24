const express = require('express');

const registrationController = require('../controllers/registration-controller');

const registrationRouter = express.Router();

registrationRouter.post('/', registrationController.registration);

module.exports = registrationRouter;
