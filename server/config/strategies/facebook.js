const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

const User = require('../../models/users');

module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: '1787582178167706',
    clientSecret: process.env.fbSecret,
    callbackURL: 'http://localhost:3000/auth/return',
    passReqToCallback: true
  },
  (req, token, refreshToken, profile, done) => {
    console.log('refreshToken:',refreshToken)
    let query = {
      'fbid': profile.id
    };

    User.findOne(query).then(user => {
      if (user) {
        console.log('User found');
        done(null, user);

      } else {
        console.log('User not found - adding to DB');
        let newUser = {};
        newUser.fbid = profile.id;
        newUser.displayName = profile.displayName;
        newUser.image = `http://graph.facebook.com/${profile.id}/picture?width=400&height=400`;
        newUser.token = token;
        newUser.stats = 0;
        newUser.favorites = [];
        newUser.queue = [];
        new User(newUser).save();
        done(null, user);
      }
    }).catch(err => {
      throw err;
    })
  }))
}
