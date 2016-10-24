const axios = require('axios');

// if in production set the url to localhost, otherwise production url
let baseUrl;
if (process.env.NODE_ENV === "production") {
  baseUrl = 'some heroku address'
} else {
  baseUrl = 'http://localhost:3000'
}

// creates an instance of axios to use throughout the app
// mostly just used so that in requests a relative path can be
// typed instead of the full path
// like get(/users/12345) instead of get(http://localhost:3000/users/12345)
const instance = axios.create({
  baseURL: process.env.HOST
});

module.exports = instance;
