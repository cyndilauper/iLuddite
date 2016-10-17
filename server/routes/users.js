const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({users: 'test'});
})

module.exports = router;
