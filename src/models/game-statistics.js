const { Schema, model, Types } = require('mongoose');

const GameStatistics = new Schema(
  {
    date: { type: Date, default: Date.now },
    time: { type: Number, required: true },
    moves: { type: Number, required: true },
    owner: { type: Types.ObjectId, ref: 'User' },
  },
  { versionKey: false },
);

module.exports = model('Game', GameStatistics);
