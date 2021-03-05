const ApiError = require('../error/api-error');
const Game = require('../models/game');
const User = require('../models/user');
const Setting = require('../models/setting');
const Option = require('../models/option');
const generateAccessToken = require('../utils/generateAccessToken');

const DEFAULT_LIMIT_ITEMS = 10;

exports.setGameResult = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { result, settings, options } = req.body;

    const game = new Game({ ...result, owner: id });
    await game.save();
    await Setting.updateOne({ owner: id }, { ...settings });
    await Option.updateOne({ owner: id }, { ...options });

    return res.json({ message: 'The game results saved successfully' });
  } catch (e) {
    return next(ApiError.badRequest('Error saving results'));
  }
};

exports.setOptions = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { options, settings } = req.body;

    await Setting.updateOne({ owner: id }, { ...settings });
    await Option.updateOne({ owner: id }, { ...options });

    return res.json({ message: 'The game options saved successfully' });
  } catch (e) {
    return next(ApiError.badRequest('User request error'));
  }
};

exports.getStatistics = async (req, res, next) => {
  try {
    const { id, email } = req.user;

    await Game.find({ owner: id }).lean().exec((err, doc) => {
      const data = doc.map((el) => ({ ...el, email }));
      return res.json(data);
    });

  } catch (e) {
    return next(ApiError.badRequest('User request error'));
  }
};

exports.getHighScores = async (req, res, next) => {
  try {
    const { limit } = req.query || DEFAULT_LIMIT_ITEMS;

    const highScoresGames = await Game.find({}).sort({ moves: 1, time: 1 }).limit(Number(limit));

    const games = await Promise.all(highScoresGames.map(async (game) => {
      const { email } = await User.findById(game.owner);
      return { ...game._doc, email };
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
