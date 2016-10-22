const axios = require('axios');

// configure axios to have a base url of localhost
const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

module.exports = instance;
