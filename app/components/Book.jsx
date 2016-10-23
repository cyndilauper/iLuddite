const React = require('react');
const Link = require('react-router').Link;
const axios = require('../axios');

class Book extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      book: {}
    }
  }

  componentDidMount () {
    // as soon as the component mounts fetch the book it is
    // supposed to display
    axios.get(`/books/${this.props.params.bookid}`)
      .then(response => {
        console.log(response)
        this.setState({
          book: response.data[0]
        });
      })
  }
  render () {
    return (
      <div className="bookContainer">
        <div className="bookRow">
          <div className="bookCol col-md-6">
            <img className="bookImg" src={this.state.book.thumbnailPath}/> {/* using this image for testing*/}
          </div>

          <div className="bookCol2 col-md-6">
            <h2>{this.state.book.title}</h2>
            <h3>{this.state.book.author}</h3>
            <br/>
            <h4>About the Author</h4>
            <p>{this.state.book.authorDescription}</p>
            <h4>About the Book</h4>
            <p>{this.state.book.summary}</p>
            <br/>
            <Link className="btn btn-default btn-info" to="#" role="button">Add to Queue</Link>
            <Link className="btn btn-default btn-info" to="#" role="button">Add to Favorites</Link>
          </div>
        </div>

      </div>
    );
  }
  
};

Book.defaultProps = {
  book: {
    image: './assets/webpack.config.jpg',
    title: 'I bet this book has a great title, but we have no idea what it is',
    author: 'The person who wrote this is probably a good writer.  Probably',
    authorDescription: 'Whoever this is probably lead an interesting life, go wikipedia them.',
    summary: 'we can only guess what this book is about.  My guess? Zombies'
  }
}

module.exports = Book;

