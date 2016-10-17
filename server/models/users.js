const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  displayName: String,
  image: String,
  friends: Object,
  created_at: { type: Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);
module.exports = User;
