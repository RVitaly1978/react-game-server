const { Schema, model } = require('mongoose');

const GameStatistics = new Schema(
  {
    _id: Schema.Types.ObjectId,
    date: { type: Date, required: true, default: Date.now },
    time: { type: Number, required: true },
    score: { type: Number, required: true },
  },
  { versionKey: false },
);

module.exports = model('Game', GameStatistics);
