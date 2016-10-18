const OAuth = require('OAuth').OAuth2;

const Facebook = function (facebookKey, facebookSecret) {

  let key = facebookKey;
  let secret = facebookSecret;

  let oauth = new OAuth(
    key, secret, 'https://graph.facebook.com',
    null,
    'oauth2/token',
    null
  );

  // this function will get a user's profile image. we will be storing their
  // profile image once their account is created - so for now it will not be used
  let getImage = function(userKey, done) {
    oauth.get(
      'https://graph.facebook.com/me/picture?redirect=false&width=400&height=400',
      userKey, (error, results, res) => {
        if (error) {
          console.log(`error: ${error}`);
        }
        results = JSON.parse(results);
        done(results.data.url);
    });
  }

  // this function will get a list of all friends who are also using this app
  let getFriends = function(userKey, done) {
    oauth.get(
    'https://graph.facebook.com/me/friends?redirect=false',
    userKey, (error, results, res) => {
      if (error) {
        console.log(`error: ${error}`);
      }
      results = JSON.parse(results);
      done(results.data);
    });
  }

  return {
      getImage: getImage,
      getFriends: getFriends
  }
}

module.exports = Facebook;
