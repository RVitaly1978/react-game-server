const { Types } = require('mongoose');

const ApiError = require('../error/api-error');
const Game = require('../models/game-statistics');
const User = require('../models/user');
const Setting = require('../models/game-settings');
const generateAccessToken = require('../utils/generateAccessToken');

const DEFAULT_LIMIT_ITEMS = 10;

exports.setGameResult = async (req, res, next) => {
  try {
    const { id } = req.user;
    const results = req.body;

    const game = new Game({ ...results, owner: id });
    await game.save();

    return res.json({ message: 'The game results saved successfully' });
  } catch (e) {
    return next(ApiError.badRequest('User request error'));
  }
};

exports.setUserSettings = async (req, res, next) => {
  try {
    const { id } = req.user;
    const settings = req.body;

    await Setting.updateOne({ owner: id }, { ...settings });

    return res.json({ message: 'The game settings saved successfully' });
  } catch (e) {
    return next(ApiError.badRequest('User request error'));
  }
};

exports.getUserSettings = async (req, res, next) => {
  try {
    const { id } = req.user;

    const data = await Setting.findOne({ owner: id }).select('-_id -owner');
    return res.json(data);
  } catch (e) {
    return next(ApiError.badRequest('User request error'));
  }
};

exports.getUserStatistics = async (req, res, next) => {
  try {
    const { id } = req.user;

    const data = await Game.find({ owner: id });
    return res.json(data);
  } catch (e) {
    return next(ApiError.badRequest('User request error'));
  }
};

exports.getUsersHighScores = async (req, res, next) => {
  try {
    const { limit } = req.query || DEFAULT_LIMIT_ITEMS;

    const highScoresGames = await Game.find({}).sort({ moves: 1 }).limit(Number(limit));
    const games = await Promise.all(highScoresGames.map(async (game) => {
      const { email } = await User.findById(game.owner);
      return { ...game._doc, owner: email };
    }));

    return res.json(games);
  } catch (e) {
    return next(ApiError.badRequest('User request error'));
  }
};

exports.check = async (req, res, next) => {
  const { id, email } = req.user;

  const token = generateAccessToken(id, email);
  return res.json({ token });
};
