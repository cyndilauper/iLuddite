const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
  _id: { type: String, required: true, unique: true },
  book_id: { type: Schema.Types.ObjectId, ref: 'Books' },
  user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
  content: String
});

const Reviews = mongoose.model('Reviews', reviewsSchema);
module.exports = Reviews;
