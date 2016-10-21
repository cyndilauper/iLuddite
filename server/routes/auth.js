const express = require('express');
const passport = require('passport');
const router = express.Router();

router.route('/')
  .get(passport.authenticate('facebook', {
      scope: ['user_friends', 'user_location']
      // eventually add 'user_actions.books' to scope list
  }));


router.get('/return', (req, res, next) => {
  passport.authenticate('facebook', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/');
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res.redirect(`/users/${user.fbid}`);
      // return res.json(user);
    });
  })(req, res, next);
});

module.exports = router;
