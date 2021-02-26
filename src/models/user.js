const { Schema, model } = require('mongoose');

const User = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    statistics: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  },
  { versionKey: false },
);

module.exports = model('User', User);
