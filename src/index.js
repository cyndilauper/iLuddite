/*
  This is the entry point for the front end. Do not rename or move this file without changing the "entry" property inside of webpack.config.js
*/
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import React from 'react';
import { render } from 'react-dom';

import App from './App';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
