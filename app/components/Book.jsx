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
      makeRev: ""
    }
  }

  componentDidMount () {
    // clear out any search results that might still
    // be showing (this is kinda hacky and probably
    // needs to be done a little differently TODO)
    this.props.clearSearchResults();
    // as soon as the component mounts fetch the book it is
    // supposed to display
    axios.get(`/books/${this.props.params.bookid}`)
      .then(response => {
        this.setState({
          book: response.data[0]
        });
      })

    axios.get(`/reviews/${this.props.params.bookid}`)
      .then(response => {
        this.setState({
          reviews: response.data
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
      axios.get(`/books/${nextProps.params.bookid}`)
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
      rating: 5
    })
  }

  handleChange(e){
    this.setState({makeRev: e.target.value})
  }

  render () {
    // if (this.state.book.authorId) {

    // }
    const { addBookToQueue, addBookToFavorites, makeCurrentBook, addBookToPastReads } = this.props;
    return (
      <div className="bookContainer">
        <div className="bookRow">
          <div className="bookCol col-md-6">
            <img className="bookImg" src={this.state.book.thumbnailPath}/>
          </div>

          <div className="bookCol2 col-md-6">
            <h2>{this.state.book.title}</h2>

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
            <button
              className="btn btn-default btn-info" role="button"
              onClick={addBookToQueue.bind(null, this.state.book._id)}
            >
              Add to Queue
            </button>
            <button
              className="btn btn-default btn-info" role="button"
              onClick={makeCurrentBook.bind(null, this.state.book._id)}
            >
              Make my Current
            </button>
            <button
              className="btn btn-default btn-info" role="button"
              onClick={addBookToFavorites.bind(null, this.state.book._id)}
            >
            Add to Favorites
            </button>
            <button
              className="btn btn-default btn-info" role="button"
              onClick={addBookToPastReads.bind(null, this.state.book._id)}
            >
            Add to Past Reads
            </button>
          </div>
        </div>
        <div className="reviewRow">
          <Review reviews={this.state.reviews} 
            handleChange={this.handleChange.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)} />
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
