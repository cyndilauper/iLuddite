const mongoose = require('mongoose');
const Books = require('./books');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userPhoto: { data: Buffer, contentType: String },
  // //queue & favorites are arrays of instances of the Book model
  // queue: [Book],
  // favorites: [Book],
  // //friends is an array of instances of the User model
  // friends: [User]
});

var Users = mongoose.model('Users', usersSchema);
module.exports = Users;
