const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
  {
    field: { type: String, default: 'xs' },
    speed: { type: String, default: 'slow' },
    difficulty: { type: String, default: 'easy' },
    owner: { type: Types.ObjectId, ref: 'User' },
  },
  { versionKey: false },
);

module.exports = model('Option', schema);
