/*
  This is the entry point for the front end. Do not rename or move this file without changing the "entry" property inside of webpack.config.js
*/
const React = require('react');
const ReactDOM = require('react-dom');

// this is all just an example of how to import other components
const App = require('./components/App');

// and then render them out
ReactDOM.render(<App />, document.getElementById('app'));
