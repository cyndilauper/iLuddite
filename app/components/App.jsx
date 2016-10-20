const React = require('react');
const Navbar = require('./Navbar');
const EditPage = require('./EditPage');
const axios = require('axios');

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loggedInUserId: '',
      loggedInUserQueue: this.props.route.data.queue,
      loggedInUserFavorites: this.props.route.data.favorites,
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
          {this.renderChildrenWithProps()}
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
    // go through current queue and filter out isbn
    const filtered = 
      this.state.loggedInUserQueue.filter(book => book.isbn !== isbn);
    axios.delete(`/users/${userid}/queue/${isbn}`)
  }

  addBookToQueue (isbn) {

  }

  removeBookFromFavorites (isbn) {

  }

  addBookToFavorites (isbn) {
    
  }

  // This function is used to render out children given to App by router
  // before rendering them we inspect what type of component they are
  // and inject properties into them so that they can display all the data
  // they need.
  renderChildrenWithProps () {
    // loop through the children of App and add properties to component
    // and return a copy of it with new props.
    return React.Children.map(this.props.children, (child) => {
      if (child.type.name === "EditPage") {
        return React.cloneElement(child, {
          queue: this.state.loggedInUserQueue,
          favorites: this.state.loggedInUserFavorites
        })
      return child;
      }
    });
  }

}

// export the class so other files can work with it.
module.exports = App;
