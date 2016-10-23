const OAuth = require('oauth');
const OAuth2 = OAuth.OAuth2;
const fbAuth = new OAuth2(
  '1787582178167706', process.env.fbSecret, 'https://graph.facebook.com',
  null, 'oauth2/token', null
);

// this function will get a user's profile image. we will be storing their
// profile image once their account is created - so for now it will not be used.
// at a later date - we can use this to either dynamically display their current
// photo, or update their profile photo in the database.
exports.getImage = function(userKey, done) {
  fbAuth.get(
    'https://graph.facebook.com/me/picture?redirect=false&width=400&height=400',
    userKey, (error, results, res) => {
      if (error) {
        console.log(`getImage error: ${error}`);
      }
      results = JSON.parse(results);
      done(results.data.url);
  });
}

// this function gets a user's location. currently, it is called once on account
// creation.
exports.getLocation = function(userKey, done) {
  fbAuth.get(
  'https://graph.facebook.com/me?fields=location',
    userKey, (error, results, res) => {
      if (error) {
        console.log(`getLocation error: ${error}`);
      }
      results = JSON.parse(results);
      done(results);
  });
}

// this function will return a list of an individual's friends who also use the
// app.
exports.getFriends = function(userKey, profile, done) {
  fbAuth.get(
    `https://graph.facebook.com/${profile}/friends?redirect=false`,
    userKey, (error, results, res) => {
      if (error) {
        console.log(`getFriends error: ${error}`);
      }
      results = JSON.parse(results);
      done(results.data);
  });
}
