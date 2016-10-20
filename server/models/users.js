const mongoose = require('mongoose');
// const Books = require('./books');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fbid: String,
  displayName: String,
  image: String,
  token: String,
  favorites: Array,
  queue: Array,
  // queue: [{ type: Schema.Types.ObjectId, ref: 'Books' }],
  // favorites: [{ type: Schema.Types.ObjectId, ref: 'Books' }],
  stats: Number,
  created_at: { type: Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);
module.exports = User;
