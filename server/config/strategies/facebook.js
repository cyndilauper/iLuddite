const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

const User = require('../../models/users');

const facebook = require('../../services/facebook');

module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: '1787582178167706',
    clientSecret: process.env.fbSecret,
    callbackURL: `${process.env.host}/auth/return`,
    passReqToCallback: true
  },
  (req, token, refreshToken, profile, done) => {
    let query = {
      'fbid': profile.id
    };

    User.findOne(query).then(user => {
      if (user) {
        console.log('User found');
        done(null, user);

      } else {
        console.log('User not found - adding to DB');
        facebook.getLocation(token, results => {
          let location;
          try {
            location = results.location.name;
          }
          catch(error){
            console.log(`Error: ${error}\nSetting location to unknown`)
            location = 'Anywhere, USA'
          }
          new User({ fbid: profile.id,
            displayName: profile.displayName,
            image: `http://graph.facebook.com/${profile.id}/picture?width=400&height=400`,
            token: token,
            stats: 0,
            location: location,
            }).save(error => {
            console.log(error);
          });
          done(null, user);
        })
      }
    }).catch(error => {
      throw error;
    })
  }))
}
