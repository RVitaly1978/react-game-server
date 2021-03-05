const express = require('express');
const userControllers = require('../controllers/user-controller');

const userRouter = express.Router();

userRouter.post('/game', userControllers.setGameResult);
userRouter.post('/options', userControllers.setUserOptions);
userRouter.get('/statistics', userControllers.getUserStatistics);
userRouter.get('/records', userControllers.getUsersHighScores);
userRouter.get('/auth', userControllers.check);

module.exports = userRouter;
