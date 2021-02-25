const express = require('express');
const userControllers = require('../controllers/user-controller');

const userRouter = express.Router();

userRouter.post('/game', userControllers.setGameResult);
userRouter.get('/statistics', userControllers.getUserStatistics);
userRouter.get('/records', userControllers.getUsersHighScores);

module.exports = userRouter;
