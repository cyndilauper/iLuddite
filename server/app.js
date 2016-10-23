#! /usr/bin/env node

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const morgan= require('morgan');
if (process.env.NODE_ENV !== 'production') {
  require('dot-env');
}

const db = require('./config/db');

const routes = require('./routes/index');
const users = require('./routes/users');
const books = require('./routes/books');
const auth = require('./routes/auth');
const authors = require('./routes/authors');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'booksyall',
    resave: true,
    saveUninitialized: true
}));

require('./config/passport')(app);

app.use('/', routes);
app.use('/users', users);
app.use('/books', books);
app.use('/auth', auth);
app.use('/authors', authors)

// 404 catcher
app.use((req, res, next) => {
  let err = new Error(`404: ${req.originalUrl} Not Found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  // res.status(err.status || 500);
  res.status(500).send({
    message: err.message,
    error: err
  });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;
