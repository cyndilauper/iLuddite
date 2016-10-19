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


var user = {
  image: '/assets/user.jpg',
  name: 'Luddington Beasley',
  location: 'Austin, Tx',
  booksRead: '43'
}

// to test user set const App = require('./components/UserBox');
// and  ReactDOM.render(<App user={user}/>, document.getElementById('app'));

var currentBook = {
  image: '/assets/book0.jpg',
  title: 'The MotorCycle Diaries',
  author: 'Che Guevera',
  description: 'The Motorcycle Diaries (Spanish: Diarios de Motocicleta) is a memoir that traces the early travels of Marxist revolutionary Ernesto "Che" Guevara, \
  then a 23-year-old medical student, and his friend Alberto Granado, a 29-year-old biochemist. Leaving Buenos Aires, Argentina, in January 1952 on the back of a \
  sputtering single cylinder 1939 Norton 500cc dubbed La Poderosa ("The Mighty One"), they desired to explore the South America they only knew from books.'
}

// to test currentBook set write const App = require('./components/CurrentBook');
// and render: ReactDOM.render(<App currentBook={currentBook}/>, document.getElementById('app'));

ReactDOM.render(<App />, document.getElementById('app'));
