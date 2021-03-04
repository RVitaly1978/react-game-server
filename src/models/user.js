const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    settings: { type: Schema.Types.ObjectId, ref: 'Setting' },
    options: { type: Schema.Types.ObjectId, ref: 'Option' },
    games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  },
  { versionKey: false },
);

module.exports = model('User', schema);
