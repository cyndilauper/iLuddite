/*
  This is the entry point for the front end. Do not rename or move this file without changing the "entry" property inside of webpack.config.js
*/
const React = require('react');
const ReactDOM = require('react-dom');

// this is all just an example of how to import other components

const UserProfile = require('./components/UserProfile');

// dummy data all components
const dummyData = require('./dummyData');

ReactDOM.render(<UserProfile user={dummyData.user} currentBook={dummyData.currentBook} bookQueue={dummyData.profileQueue} friendQueue={dummyData.friends}/>, document.getElementById('app'));



