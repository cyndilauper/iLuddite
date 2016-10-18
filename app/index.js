/*
  This is the entry point for the front end. Do not rename or move this file without changing the "entry" property inside of webpack.config.js
*/
const React = require('react');
const ReactDOM = require('react-dom');

// React router goodies
import { Router, Route, browserHistory } from 'react-router';

// this is all just an example of how to import other components

const App = require('./components/App');

const Landing = require('./components/Landing');

// and then render them out
ReactDOM.render(
  <Router>
    <Route path="/" component={Landing} />
    <Route path="/profile" component={App} />
  </Router>,
  document.getElementById('app')
);

