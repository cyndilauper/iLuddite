const React = require('react');
const Link = require('react-router').Link;
const axios = require('../axios');
const Review = require('./Review')

class Book extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      book: {},
      reviews: [],
      currReviews: [],
      makeRev: "",
      rating: 0,
      loggedInUser: this.props.loggedInUser
    }

    setInterval(() => {
      var shuffled = this.state.reviews.sort(() => .5 - Math.random())
      this.setState({
        currReviews: shuffled.slice(0,2)
      })
    }, 5000)

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.book !== this.state.book){
      this.setState({
        reviews: [],
        currReviews: [],
        makeRev: "",
        rating: 0
      })
    }
  }

  componentDidMount () {
    // this.setState({
    //   loggedInUser: this.props.loggedInUser
    // })

    console.log('user: ',this.state.loggedInUser)

    
    let alreadyQueued = this.state.loggedInUser.queue.map(book => 
      book._id
    )
    
    let alreadyRead = this.state.loggedInUser.pastReads.map(book => 
      book._id
    )
    
    let alreadyFavorite = this.state.loggedInUser.favorites.map(book =>
      book._id
    )

    if (alreadyQueued.includes(this.props.params.bookid)) {
      document.getElementById("addBookToQueueButton").classList.add("hide-button")
    }

    if (alreadyQueued[0] === this.props.params.bookid) {
      document.getElementById("addBookToCurrentButton").classList.add("hide-button")
    }

    if (alreadyRead.includes(this.props.params.bookid)) {
      document.getElementById("addBookToPastReadsButton").classList.add("hide-button")
    }
    
    if (alreadyFavorite.includes(this.props.params.bookid)) {
      document.getElementById("addBookToFavoritesButton").classList.add("hide-button")
    }

    // clear out any search results that might still
    // be showing (this is kinda hacky and probably
    // needs to be done a little differently TODO)
    this.props.clearSearchResults();
    // as soon as the component mounts fetch the book it is
    // supposed to display
    axios.get(`/api/books/${this.props.params.bookid}`)
      .then(response => {
        console.log('munchy breakfast: ', response)
        this.setState({
          book: response.data[0]
        });
      })

    axios.get(`/reviews/${this.props.params.bookid}`)
      .then(response => {
        this.setState({
          reviews: response.data,
          currReviews: [response.data[0], response.data[1]]
        })
      })
  }

  // if the user searches for a book in the navbar
  // and then selects one while they are alreay on the
  // book component then this function will get called
  // use it as a chance to dismiss the dropdown and fetch
  // the new book the user is trying to view
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.bookid !== this.props.params.bookid) {
      this.props.clearSearchResults();
      // fetch the new book
      axios.get(`/api/books/${nextProps.params.bookid}`)
        .then(response => {
          this.setState({
            book: response.data[0]
          });
        });
    }
  }

  handleSubmit(e){
    e.preventDefault()
    axios.post(`/reviews/${this.props.params.bookid}`, {
      content: this.state.makeRev,
      rating: this.state.rating
    })
    .then(res => {
      axios.get(`/reviews/${this.props.params.bookid}`)
      .then(response => {
        this.setState({
          reviews: response.data,
          rating: 0,
          makeRev: ""
        })
      })
    })
  }

  handleChange(e){
    this.setState({makeRev: e.target.value})
  }

  incRating(e){
    e.preventDefault()
    if (this.state.rating < 5) {
      this.setState({
        rating: this.state.rating + 1
      })
    } else if (this.state.rating === 5) {
      this.setState({
        rating: 0
      })
    }
  }

  render () {
    const { addBookToQueue, addBookToFavorites, makeCurrentBook, addBookToPastReads } = this.props;
    return (
      <div className="bookContainer">
        <div className="bookRow">
          <div className="bookCol col-md-6">
            <img className="bookImg" src={this.state.book.thumbnailPath}/>
          </div>

          <div className="bookCol2 col-md-6">
            <h2>{this.state.book.title}</h2>
            <a href={this.state.book.buyLink}>Buy it now</a>

            <h3>
              {+this.state.book.authorId ?
                (<Link to={`/authors/${this.state.book.authorId}`} >
                  {this.state.book.author}
                </Link>) :

                  this.state.book.author
              }
            </h3>
            <h4>About the Book</h4>
            <p>{this.state.book.summary}</p>
            <br/>
            <div>
              <button
                className="btn btn-default btn-info" role="button"
                onClick={addBookToQueue.bind(null, this.state.book._id)}
                id="addBookToQueueButton"
              >
                Add to Queue
              </button>
              <button
                className="btn btn-default btn-info" role="button"
                onClick={makeCurrentBook.bind(null, this.state.book._id)}
                id="addBookToCurrentButton"
              >
                Make my Current
              </button>
              <button
                className="btn btn-default btn-info" role="button"
                onClick={addBookToFavorites.bind(null, this.state.book._id)}
                id="addBookToFavoritesButton"
              >
              Add to Favorites
              </button>
              <button
                className="btn btn-default btn-info" role="button"
                onClick={addBookToPastReads.bind(null, this.state.book._id)}
                id="addBookToPastReadsButton"
              >
              Add to Past Reads
              </button>
            </div>
          </div>
        </div>
        <div className="reviewRow">
          <Review currReviews={this.state.currReviews}
            handleChange={this.handleChange.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
            incRating={this.incRating.bind(this)}
            rating={this.state.rating}
            text={this.state.makeRev} />
        </div>
      </div>
    );
  }
};

Book.defaultProps = {
  book: {
    image: '../public/assets/default-img.jpg',
    title: 'I bet this book has a great title, but we have no idea what it is',
    author: 'The person who wrote this is probably a good writer.  Probably',
    authorDescription: 'Whoever this is probably lead an interesting life, go wikipedia them.',
    summary: 'we can only guess what this book is about.  My guess? Zombies'
  }
}

module.exports = Book;
