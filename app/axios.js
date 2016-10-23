const axios = require('axios');

// if in production set the url to localhost, otherwise production url
let baseUrl;
if (process.env.NODE_ENV === "production") {
  baseUrl = 'some heroku address'
} else {
  baseUrl = 'http://localhost:3000'
}

const instance = axios.create({
  baseURL: baseUrl
});

module.exports = instance;
