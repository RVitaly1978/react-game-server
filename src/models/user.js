const { Schema, model } = require('mongoose');

const User = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    settings: { type: Schema.Types.ObjectId, ref: 'Settings' },
    statistics: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  },
  { versionKey: false },
);

module.exports = model('User', User);
