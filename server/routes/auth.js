const express = require('express');
const passport = require('passport');
const router = express.Router();

router.route('/facebook')
  .get(passport.authenticate('facebook', {
      scope: ['email', 'user_friends']
  }));
router.route('/facebook/callback')
  .get(passport.authenticate('facebook', {
      successRedirect: '/users',
      failureRedirect: '/error'
  }));
module.exports = router;
