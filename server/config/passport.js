const passport = require('passport');
const User = require('../models/users');

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  require('./strategies/facebook')();
};
