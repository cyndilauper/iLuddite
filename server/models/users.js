const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  //setup user schema
});

var User = mongoose.model('User', userSchema);
module.exports = User;
