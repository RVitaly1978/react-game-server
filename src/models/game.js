const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
  {
    date: { type: Date, default: Date.now },
    time: { type: Number, required: true },
    moves: { type: Number, required: true },
    field: { type: String, required: true },
    speed: { type: String, required: true },
    difficulty: { type: String, required: true },
    userNick: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: 'User' },
  },
  { versionKey: false },
);

module.exports = model('Game', schema);
