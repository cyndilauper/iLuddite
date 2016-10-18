const mongoose = require('mongoose');
const UserBooks = require('./userBooks');
const UserFriends = require('./userFriends');


const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userPhoto: { data: Buffer, contentType: String },
  // //queue & favorites are arrays of instances of the UserBooks sub-document model
  queue: [UserBooks.Schema],
  favorites: [UserBooks.Schema],
  // friends is an array of instances of the UserFriends sub-document model
  friends: [UserFriends.Schema]
});

var Users = mongoose.model('Users', usersSchema);
module.exports = Users;
