const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
  _id: { type: String, required: true, unique: true },
  book_id: { type: Schema.Types.String, ref: 'Books' },
  user_id: { type: Schema.Types.String, ref: 'Users' },
  content: String,
  created_at: {type: Date, default: Date.now}
});

const Reviews = mongoose.model('Reviews', reviewsSchema);
module.exports = Reviews;
