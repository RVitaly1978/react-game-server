const { Schema, model, Types } = require('mongoose');

const GameSettings = new Schema(
  {
    musicVolume: { type: Number, required: true, default: 5 },
    effectsVolume: { type: Number, required: true, default: 5 },
    owner: { type: Types.ObjectId, ref: 'User' },
  },
  { versionKey: false },
);

module.exports = model('Setting', GameSettings);
