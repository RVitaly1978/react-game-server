const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
  {
    userNick: { type: String, default: 'user' },
    musicVolume: { type: Number, default: 5 },
    effectsVolume: { type: Number, default: 5 },
    theme: { type: String, default: 'light' },
    lang: { type: String, default: 'en' },
    owner: { type: Types.ObjectId, ref: 'User' },
  },
  { versionKey: false },
);

module.exports = model('Setting', schema);
