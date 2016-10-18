const mongoose = require('mongoose');
const Book = require('./books');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userPhoto: { data: Buffer, contentType: String },
  // //queue & favorites are arrays of instances of the Book model
  // queue: [Book],
  // favorites: [Book],
  // //friends is an array of instances of the User model
  // friends: [User]
});

var User = mongoose.model('User', userSchema);
module.exports = User;
