const React = require('react');
const Navbar = require('./Navbar');
const EditPage = require('./EditPage');
const axios = require('axios');

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      navbarSearchText: '',
      navbarSearchResults: [],
      loggedInUser: {
        /* when populated
          fbid: '',
          displayName: '',
          favorites: [],
          queue: [ { _id, title, author, summary, thumbnail, coverPhoto }],
          stats: '',
          friends: [ { name: fbid: image: } ]
        */
      }
    }
  }

  componentDidMount () {
    this.setState({
      loggedInUser: this.props.route.data
    });
  }

  render () {
    const style = { height: '100vh' };
    // if we are at if we are at '/' route don't render navbar
    // simply render children
    if (this.props.location.pathname === '/') {
      return (
        <div>
          {this.renderChildrenWithProps()}
        </div>
      )
    } else {
      // otherwise show the navbar and any children that the router gives 
      // app
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

  // this function would be needed anytime the user clicks on one of the books
  // in the navbarSearchResults dropdown. In that case the user would get 
  // sent to that book and then the list needs to be destroyed.
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
    // adds the clicked book to back of queue.  
    axios.post(`/users/${userid}/queue/${isbn}`)
    .then( book => {
      this.setState({
        loggedInUserQueue:this.state.loggedInUserQueue.concat(book)
      })
    })
  }

  makeCurrentBook (isbn){
    // makes the clicked book your current Book.
    axios.post(`/users/${userid}/queue/${isbn}?current=true`)
    .then( book => {
      this.setState({
        loggedInUserQueue: [book].concat(this.state.loggedInUserQueue)
      })
    })
  }

  removeBookFromFavorites (isbn) {
    // removesBookFromFavorites
    const filtered = 
    this.state.loggedInUserFavorites.filter(book => {
      return book.isbn !== isbn;
    });
    axios.delete(`/users/${userid}/favorites/${isbn}`)

  }

  addBookToFavorites (isbn) {
    // adds book to Favorites

  }

  // used from the landing page once auth is successful.
  loginUser (user) {
    this.setState({
      loggedInUser: user
    });
  }

  // This function is used to render out children given to App by router
  // before rendering them we inspect what type of component they are
  // and inject properties into them so that they can display all the data
  // they need.
  renderChildrenWithProps () {
    // loop through the children of App and add properties to component
    // and return a copy of it with new props.
    return React.Children.map(this.props.children, (child) => {
      switch (child.type.name) {
        case "Landing" :
          // we need the landing page to be able to login a user
          return React.cloneElement(child, {
            handleUserLogin: this.loginUser.bind(this)
          })
          break;
        case "EditPage" :
          return React.cloneElement(child, {
            queue: this.state.loggedInUser.queue,
            favorites: this.state.loggedInUser.favorites
          });
          break;
        case "UserProfile" :
          return React.cloneElement(child, {
            loggedInUser: this.state.loggedInUser
          });
          break;
        default :
          return child;
      }
    });
  }

}

// export the class so other files can work with it.
module.exports = App;
