/*
  This is the entry point for the front end. Do not rename or move this file without changing the "entry" property inside of webpack.config.js
*/
const React = require('react');
const ReactDOM = require('react-dom');

// this is all just an example of how to import other components
const App = require('./components/App');
const EditPage = require('./components/EditPage');

// dummy data for EditPage
const data = {
  queue: [
    {
      title: 'Of Mice and Men',
      author: 'John Steinbeck'
    },
    {
      title: 'A Tale of Two Cities',
      author: 'Charles Dickens'
    },
    {
      title: 'Little Women',
      author: 'Louisa May Alcott'
    }
  ],
  favorites: [
    {
      title: 'Of Mice and Men',
      author: 'John Steinbeck'
    },
    {
      title: 'A Tale of Two Cities',
      author: 'Charles Dickens'
    },
    {
      title: 'Little Women',
      author: 'Louisa May Alcott'
    }
  ]
}

// and then render them out
ReactDOM.render(
  <EditPage favorites={data.favorites} queue={data.queue} />, 
  document.getElementById('app')
);
