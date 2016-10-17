const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, req: true, unique: true },
  password: { type: String, req: true },
  userPhoto: { data: Buffer, contentType: String },
  //queue & favorites are arrays of instances of the Book model
  queue: [Book],
  favorites: [Book],
  //friends is an array of instances of the User model
  friends: [User]
});

var User = mongoose.model('User', userSchema);
module.exports = User;
