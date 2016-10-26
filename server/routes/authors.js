//These routes are fully functional but we didn't have time to implement the authors feature in its entirety.  Enjoy!

const express = require('express');
const router = express.Router();
const Author = require('../models/authors');
const Books = require('../models/books');
const request = require('request');
const xml = require('xml2js').parseString;

router.get('/search/:author', (req, res) => {
  let authorSearched = req.params.author;
  let options = {
    url: `https://www.goodreads.com/api/author_url/${authorSearched}?key=${process.env.goodreads}`
  }

  function getAuthorInfo(err, response, body) {
    if (!err && response.statusCode == 200) {
      //goodreads returns XML so we've gotta parse it to JSON
      body = xml('' + body, (err, result) => {
        let authorId = result.GoodreadsResponse.author[0].$.id;
        let options = {
          url: `https://www.goodreads.com/author/show/${authorId}?key=${process.env.goodreads}`
        }
        //once we've got the goodreads author id, perform a separate query to get the author info since goodreads makes us do that
        request(options, (err, response, body) => {
          if (!err && response.statusCode == 200) {
            body = xml('' + body, (err, result) => {
              Author.findOneAndUpdate({
                _id: result.GoodreadsResponse.author[0].id
              }, {
                _id: result.GoodreadsResponse.author[0].id,
                name: result.GoodreadsResponse.author[0].name[0],
                description: result.GoodreadsResponse.author[0].about[0],
                photoPath: result.GoodreadsResponse.author[0].large_image_url[0],
              },
              //adds the document if it doesn't exist, returns the new, rather than the found, document
              {upsert: true, new: true},
              (err, author) => {
                if (err) {
                  console.log(`Error in author insert: ${err}`);
                } else {
                  console.log(`Author inserted: ${author}`);
                  res.send(author);
                }
              })
            })
          }
        })
      });
    } else {
      //error handler for request module attempt
      console.log(`Error in API call: ${err}`);
    }
  }
  //call the request module
  request(options, getAuthorInfo);
})
router.get('/:authorId/books', (req,res,next) => {
  let authorId = req.params.authorId
  let options = {
    url: `https://www.goodreads.com/author/list/${authorId}?key=${process.env.goodreads}`
  }
  function getAuthorBooks(err, response, body){
    body = xml('' + body, (err, result) => {
      console.log(result)
      let books = result.GoodreadsResponse.author[0].books[0].book.splice(0,15)
      books = books.map((book) => 
      ({
        id: book.id[0]._,
        title: book.title,
        image: book.image_url,
        link: book.link
      })
      )
      return res.send(books)
    })
  }
  request(options, getAuthorBooks)
})

router.get('/:authorId/books', (req, res) => {
  let authorId = req.params.authorId
  let options = {
    url: `https://www.goodreads.com/author/list/${authorId}?key=${process.env.goodreads}`
  }
  console.log('author id',authorId)
  function getAuthorBooks(err, response, body) {
    body = xml('' + body, (err, result) => {
      let books = result.GoodreadsResponse.author[0].books[0].book.splice(0, 15)
      books = books.map(book => (
        {
          id: book.id[0]._,
          title: book.title,
          image: book.image_url,
          link: book.link
        }
      ))
      res.send(books)
    })
  }

  request(options, getAuthorBooks)
})

//endpoint for retrieving author from db
router.get('/:authorId', (req, res, next) => {
  console.log(req.params.authorId)
  function getAuthor(err,response,body){
    if (!err && response.statusCode == 200) {
    body = xml('' + body, (err, result) => {
      if(result){
      Author.findOneAndUpdate({
        _id: result.GoodreadsResponse.author[0].id
      }, {
        _id: result.GoodreadsResponse.author[0].id,
        name: result.GoodreadsResponse.author[0].name[0],
        description: result.GoodreadsResponse.author[0].about[0],
        photoPath: result.GoodreadsResponse.author[0].large_image_url[0],
      },
      //adds the document if it doesn't exist, returns the new, rather than the found, document
      {upsert: true, new: true},
      (err, author) => {
        if (err) {
          console.log(`Error in author insert: ${err}`);
        } else {
          console.log(`Author inserted: ${author}`);
          return res.send(author);
        }
      })
        
      }
    }) 
    }
  }
  //find by name
  Author.findOne({_id: req.params.authorId}, (err, author) => {
    console.log(author)
    if (err) {
      console.log(`Error in finding author: ${err}`);
      res.send(err);
    } 
    if(author){
      console.log(`Author found: ${author}`);
      res.send(author);
    } else {
      let authorId = req.params.authorId
      let options = {
        url: `https://www.goodreads.com/author/show/${authorId}?key=${process.env.goodreads}`
      }
      request(options, getAuthor)
    }
  })
})

module.exports = router;
