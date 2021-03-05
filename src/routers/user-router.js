const express = require('express');
const userControllers = require('../controllers/user-controller');

const userRouter = express.Router();

userRouter.post('/game', userControllers.setGameResult);
userRouter.post('/options', userControllers.setOptions);
userRouter.get('/statistics', userControllers.getStatistics);
userRouter.get('/records', userControllers.getHighScores);
userRouter.get('/auth', userControllers.check);

module.exports = userRouter;
