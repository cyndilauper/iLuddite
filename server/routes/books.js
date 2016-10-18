const express = require('express');
const router = express.Router();
const Book = require('./books');

router.get('/', (req, res, next) => {
  res.json({books: 'test'});
})

router.get('/:bookId', (req, res, next) => {
  res.json();
})

module.exports = router;
