const React = require('react');
const Link = require('react-router').Link;
const axios = require('../axios');
const Button = require('./Button');

class Book extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      book: {}
    };
  }

  componentDidMount () {
    // clear out any search results that might still
    // be showing (this is kinda hacky and probably
    // needs to be done a little differently TODO)
    this.props.clearSearchResults();
    // as soon as the component mounts fetch the book it is
    // supposed to display
    axios.get(`/books/${this.props.params.bookid}`) //React router works by automatically passing this prop down to every component
      .then(response => {
        this.setState({
          book: response.data[0]
        });
      });
  }

  // if the user searches for a book in the navbar
  // and then selects one while they are alreay on the
  // book component then this function will get called
  // use it as a chance to dismiss the dropdown and fetch
  // the new book the user is trying to view
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.bookid !== this.props.params.bookid) { //Apparently, inputting into the search bar has the same effect as the url bar
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

  render () {

    const { addBookToQueue, addBookToFavorites, makeCurrentBook, loggedInUser } = this.props;
    return (
      <div className="bookRow row">
        <div className="bookCol col-sm-4">
          <img className="bookImg" src={this.state.book.thumbnailPath}/>
        </div>
        <div className="col-sm-1"></div>
        <div className="bookCol2 col-sm-6">
          <h2>{this.state.book.title}</h2>
          <h3>{this.state.book.author}</h3>
          <h4>About the Book</h4>
          <p className="book-summary">{this.state.book.summary}</p>
          <br/>
          <Button
            bookid={this.state.book._id}
            click={addBookToQueue.bind(null)}
            type={'To Queue'}
            loggedInUser={loggedInUser}
            />
          <Button
            bookid={this.state.book._id}
            click={makeCurrentBook.bind(null)}
            type={'Make Current'}
            loggedInUser={loggedInUser}
            />
          <Button
            bookid={this.state.book._id}
            click={addBookToFavorites.bind(null)}
            type={'Add to Favorites'}
            loggedInUser={loggedInUser}
            />
        </div>
        <div className="col-sm-1"></div>
      </div>
    );
  }

}

Book.defaultProps = {
  book: {
    image: '../public/assets/default-img.jpg',
    title: 'I bet this book has a great title, but we have no idea what it is',
    author: 'The person who wrote this is probably a good writer.  Probably',
    authorDescription: 'Whoever this is probably lead an interesting life, go wikipedia them.',
    summary: 'we can only guess what this book is about.  My guess? Zombies'
  }
};

module.exports = Book;
