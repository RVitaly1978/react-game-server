const { Types } = require('mongoose');

const ApiError = require('../error/api-error');
const Game = require('../models/game-statistics');
const User = require('../models/user');

const DEFAULT_LIMIT_ITEMS = 10;

exports.setGameResult = async (req, res, next) => {
  try {
    const { time, score, username } = req.body;

    const game = new Game({ _id: new Types.ObjectId(), time, score, date: new Date() });
    await game.save();
    await User.findOneAndUpdate({ username }, { $push: { statistics: game._id }});

    return res.json({ message: 'The game results saved successfully' });
  } catch (e) {
    return next(ApiError.badRequest('User request error'));
  }
};

exports.getUserStatistics = async (req, res, next) => {
  try {
    const { id } = req.user;

    const { statistics } = await User.findById(id).populate('statistics');
    return res.json({ statistics });
  } catch (e) {
    return next(ApiError.badRequest('User request error'));
  }
};

exports.getUsersHighScores = async (req, res, next) => {
  try {
    const { limit } = req.query || DEFAULT_LIMIT_ITEMS;

    const games = await Game.find({}).sort({ score: -1 }).limit(Number(limit));
    return res.json({ games });
  } catch (e) {
    return next(ApiError.badRequest('User request error'));
  }
};
