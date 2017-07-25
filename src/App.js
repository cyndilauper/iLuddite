import { Switch, Route } from 'react-router-dom';

import React from 'react';

import Home from './Home';
import EditPage from './components/EditPage';
import UserProfile from './components/UserProfile';
import Book from './components/Book';

import './static/css/bootstrap.css';
import './styles.css';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="users/:userid" component={UserProfile} />
      <Route path="users/:userid/edit" component={EditPage} />
      <Route path="books/:bookid" component={Book} />
    </Switch>
  </div>
);
export default App;
