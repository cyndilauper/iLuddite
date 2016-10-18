const mongoose = require('mongoose');
const UserBooks = require('./userBooks');

const Schema = mongoose.Schema;

const userFriendsSchema = new Schema({
  username: { type: String, required: true, unique: true },
  userPhoto: { data: Buffer, contentType: String },
  // //queue & favorites are arrays of instances of the UserBooks sub-document model
  queue: [UserBooks.Schema],
  favorites: [UserBooks.Schema],
  // not sure how to handle friends, perhaps like this?
  friends: [Users.Schema]
});

var UserFriends = mongoose.model('UserFriends', userFriendsSchema);
module.exports = UserFriends;
