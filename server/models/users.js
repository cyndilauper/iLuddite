const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  fbid: String,
  displayName: String,
  image: String,
  token: String,
  queue: [{ type: Schema.Types.String, ref: 'Books' }],
  favorites: [{ type: Schema.Types.String, ref: 'Books' }],
  location: String,
  stats: Number,
  created_at: { type: Date, default: Date.now }
});

var Users = mongoose.model('Users', usersSchema);
module.exports = Users;
