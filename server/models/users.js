const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
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

var Users = mongoose.model('Users', usersSchema);
module.exports = Users;
