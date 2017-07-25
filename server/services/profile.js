const User = require('../models/users');
const facebook = require('./facebook');

module.exports = function (req, fbid) {
  return new Promise((resolve, reject) => {
    User.findOne({ fbid })
    .populate('queue favorites')
    .exec((err, result) => {
      if (err) {
        console.log(`Error: ${err}`);
      }
    }).then((found) => {
      if (found) {
        // if user is found - pass their fbid to the getFriends function
        try {
          facebook.getFriends(req.user.token, found.fbid, (results) => {
          // convert the found object to a JSON object
            found = found.toJSON();

          // this function will get the photo from a user's profile
            function getImage(fbid) {
              return new Promise((resolve, reject) => {
                User.findOne({ fbid }, (error, obj) => {
                  if (error) {
                    reject(error);
                  } else if (!obj) {
                  // if user is a friend that uses the app, but is not found
                  // in the database, return null
                    console.log('Error: FB friend missing from database');
                    resolve(null);
                  } else {
                    resolve({ fbid: obj.fbid,
                      image: obj.image,
                      name: obj.displayName });
                  }
                });
              });
            }

          // map over the results object and add images
            const mapped = results.map(friend => getImage(friend.id));

          // once all async mapping functions have resolved, add the array to
          // the found object and return it
            Promise.all(mapped)
            .then((result) => {
              result = result.filter((friend) => {
                // filter out any null friends
                if (friend) {
                  return friend;
                }
              });
              found.friends = result;
              resolve(found);
            })
            .catch((error) => {
              console.log(`Error: ${error}`);
            });
          });
        } catch (error) {
          reject(`Error: ${error} \n Maybe you don't have a token?`);
        }
      } else {
        reject('user not found');
      }
    }).catch((error) => {
      reject(error);
    });
  });
};
