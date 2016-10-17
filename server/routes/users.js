const express = require('express');
const router = express.Router();

router.get('/:userid', (req, res, next) => {
  // GET user info (photo, friends, current book, queue, stats)
  let userID = req.params.userid;
  res.json({'userID': userID});
})

router.get('/:userid/queue', (req, res, next) => {
  // GET user queue
  let userID = req.params.userid;
  res.json({'userIDqueue': userID});
})

router.post('/:userid/queue/:bookid', (req, res, next) => {
  // POST book to queue
  let userID = req.params.userid;
  let bookID = req.params.bookid;
  res.json({'bookID': bookID});

  //TODO: add logic for pushing to current /users/:userid/queue/:bookid?current=true

})

router.delete('/:userid/queue/:bookid', (req, res, next) => {
  // DELETE book to queue
  let userID = req.params.userid;
  let bookID = req.params.bookid;
  res.json({'bookID': bookID});
})

router.get('/:userid/favorites', (req, res, next) => {
  // GET user's favorite books
  let userID = req.params.userid;
  res.json({'favorites': userID});
})

router.post('/:userid/favorites', (req, res, next) => {
  // POST to user's favorite books
  let userID = req.params.userid;
  res.json({'favorites': userID});
})

router.delete('/:userid/favorites', (req, res, next) => {
  // DELETE from user's favorite books
  let userID = req.params.userid;
  res.json({'favorites': userID});
})

module.exports = router;
