const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({index: 'test'});
})

module.exports = router;
