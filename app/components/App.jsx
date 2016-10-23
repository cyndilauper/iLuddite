const React = require('react');
const Navbar = require('./Navbar');
const EditPage = require('./EditPage');
import { browserHistory } from 'react-router';
const axios = require('../axios');

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      navbarSearchText: '',
      navbarSearchResults: [],
      loggedInUser: {}
    }
  }

  componentDidMount () {
    // When app mounts check to see if it has a logged in user,
    // if it does then send them to the profile component
    if (this.state.loggedInUser.fbid) {
      const path = `/users/${this.state.loggedInUser.fbid}`;
      browserHistory.push(path);
    } else {
      // component doesn't have a logged in user send request to server to
      // get the loggedIn user information
      axios.get('/loggedin')
        .then((response) => {
          this.setState({
            loggedInUser: response.data
          });
          const path = `/users/${this.state.loggedInUser.fbid}`;
          browserHistory.push(path);
        });
    }
  }

  render () {
    const style = { height: '100vh' };
    return (
      <div style={style}>
        <Navbar
          changeSearchText={this.changeSearchText.bind(this)}
          loggedInUserId={this.state.loggedInUser.fbid}
          searchText={this.state.navbarSearchText}
          searchResults={this.state.navbarSearchResults}
          handleSearchSubmit={this.searchForBook.bind(this)}
          addBookToQueue={this.addBookToQueue.bind(this)}
          makeCurrentBook={this.makeCurrentBook.bind(this)}
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
      .then(response => {
        this.setState({
          navbarSearchResults: response.data
        })
      });
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
    axios.delete(`/users/${this.state.loggedInUser.fbid}/queue/${isbn}`)
      .then(book => {
        const newState = Object.assign({}, this.state.loggedInUser);
        newState.queue = filtered;
        this.setState({
          loggedInUser: newState
        })
      })
  }

  addBookToQueue (isbn) {
    // check to see if book is already in users queue
    for (let i = 0; i < this.state.loggedInUser.queue.length; i++) {
      if (this.state.loggedInUser.queue[i]._id === isbn) {
        // book already is in queue do not add again
        return;
      }
    }
    // book is not in queue go ahead and add
    axios.post(`/users/${this.state.loggedInUser.fbid}/queue/${isbn}`)
    .then( response => {
      const newState = Object.assign({}, this.state.loggedInUser);
      newState.queue = newState.queue.concat(response.data);
      this.setState({
        loggedInUser: newState
      })
    })
  }

  makeCurrentBook (isbn) {
    const userid = this.state.loggedInUser.fbid;
    // see if the queue already has the book
    for (let i = 0; i < this.state.loggedInUser.queue.length; i++) {
      if (this.state.loggedInUser.queue[i]._id === isbn) {
        // if we find the book delete it and then add it at the front
        axios.delete(`/users/${userid}/queue/${isbn}`)
          // on success of deleting send an add to queue query
          .then(deleted =>
            axios.post(`/users/${userid}/queue/${isbn}?current=true`)
          )
          .then(added => {
            const book = added.data;
            const newState = Object.assign({}, this.state.loggedInUser);
            newState.queue = [book._id].concat(newState.queue);
            this.setState({
              loggedInUser: newState
            });
          })
        // return so below code doesn't get hit
        // (work below has already been done in last block)
        return;
      }
    }
    // book wasn't already in the queue so it needs to be added.
    axios.post(`/users/${userid}/queue/${isbn}?current=true`)
    .then( book => {
      book = book.data
      const newState = Object.assign({}, this.state.loggedInUser);
      newState.queue = [book._id].concat(newState.queue);
      this.setState({
        loggedInUser: newState
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
    // first make sure book is not already in favorites
    for (let i = 0; i < this.state.loggedInUser.favorites; i++) {
      if (this.state.loggedInUser.favorites[i]._id === isbn) {
        // book already in favorites just return
        return;
      }
    }
    // book is not already in list. Go ahead and add it
    axios.post(`/users/${this.state.loggedInUser.fbid}/favorites/${isbn}`)
      .then(book => {
        const newState = Object.assign({}, this.state.loggedInUser);
        newState.favorites = newState.favorites.concat(book.data);
        this.setState({
          loggedInUser: newState
        })
      })
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
        case "EditPage" :
          return React.cloneElement(child, {
            queue: this.state.loggedInUser.queue,
            favorites: this.state.loggedInUser.favorites
          });
          break;
        case "Book" :
          return React.cloneElement(child, {
            addBookToFavorites: this.addBookToFavorites.bind(this),
            makeCurrentBook: this.makeCurrentBook.bind(this),
            addBookToQueue: this.addBookToQueue.bind(this)
          })
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
