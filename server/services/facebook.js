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

  let getImage = function(userKey, done) {
    oauth.get(
      'https://graph.facebook.com/me/picture?redirect=false&type=large',
      userKey, (error, results, res) => {
        if (error) {
          console.error('error: ' + e);
        }
        results = JSON.parse(results)
        done(results.data.url);
    });
  }

  let getFriends = function(userKey, done) {
    oauth.get(
    'https://graph.facebook.com/me/friends?redirect=false',
    userKey, (error, results, res) => {
      if (error) {
        console.error('error: ' + e);
      }
      results = JSON.parse(results)
      console.log('results', results);
      done(results.summary);
    });
  }

  return {
      getImage: getImage,
      getFriends: getFriends
  }
}

module.exports = Facebook;
