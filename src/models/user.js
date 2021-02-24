const { Schema, model } = require('mongoose');

const User = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { versionKey: false },
);

module.exports = model('User', User);
