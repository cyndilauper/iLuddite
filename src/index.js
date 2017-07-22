/*
  This is the entry point for the front end. Do not rename or move this file without changing the "entry" property inside of webpack.config.js
*/
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

const React = require('react');
const ReactDOM = require('react-dom');

// React router goodies

const App = require('./App');
const EditPage = require('./components/EditPage');
const UserProfile = require('./components/UserProfile');
const Book = require('./components/Book');

ReactDOM.render(
  // <BrowserRouter>
  //     <div>
  //         <Route exact path='/' component={App}/>
  //         <Route path="users/:userid" component={UserProfile}/>
  //         <Route path="users/:userid/edit" component={EditPage}/>
  //         <Route path="books/:bookid" component={Book} />
  //     </div>
  // </BrowserRouter>,
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
