const React = require('react');
const Navbar = require('./Navbar');
const EditPage = require('./EditPage');
const axios = require('axios');

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loggedInUserId: '',
      loggedInUserQueue: this.props.data.queue,
      loggedInUserFavorites: this.props.data.queue,
      navbarSearchText: '',
      navbarSearchResults: []
    }
  }

  render () {
    const style = { height: '100vh' };
    return (
      <div style={style} onClick={this.clearSearchResults.bind(this)}>
        <Navbar 
          changeSearchText={this.changeSearchText.bind(this)}
          searchText={this.state.navbarSearchText}
          searchResults={this.state.navbarSearchResults}
        />
        <div className="container">
          <EditPage 
            queue={this.props.data.queue} 
            favorites={this.props.data.favorites}

          />
        </div>
      </div>
    );
  }

  // allow navbar input field to change navbarSearchText
  changeSearchText (newText) {
    this.setState({
      navbarSearchText: newText
    });
  }

  // uses the navbarSearchText to do an api call and search for a book.
  searchForBook () {
    axios.get(`/books/search/${this.state.navbarSearchText}`)
      .then(response => this.setState({ navbarSearchResults: response }));
  }

  clearSearchResults () {
    this.setState({
      navbarSearchResults: []
    });
  }

  removeBookFromQueue (isbn) {
    
  }

  addBookToQueue (isbn) {

  }

  removeBookFromFavorites (isbn) {

  }

  addBookToFavorites (isbn) {
    
  }
}

// export the class so other files can work with it.
module.exports = App;
