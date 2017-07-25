const express = require('express');
const passport = require('passport');

const router = express.Router();

router.route('/')
  .get(passport.authenticate('facebook', {
    scope: ['user_friends', 'user_location'],
      // eventually add 'user_actions.books' to scope list
  }));
router.route('/return')
  .get(passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/about',
  }));

module.exports = router;
