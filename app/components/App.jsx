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
          console.log(response)
          const path = `/users/${this.state.loggedInUser.fbid}`;
          browserHistory.push(path);
        });
    }
  }

  render () {
    // this style is needed to make the app as tall as the screen
    const style = { height: '100vh' };
    return (
      <div style={style} onClick={this.clearSearchResults.bind(this)}>
        <Navbar
          changeSearchText={this.changeSearchText.bind(this)}
          loggedInUserId={this.state.loggedInUser.fbid}
          searchText={this.state.navbarSearchText}
          searchResults={this.state.navbarSearchResults}
          handleSearchSubmit={this.searchForBook.bind(this)}
          addBookToQueue={this.addBookToQueue.bind(this)}
          addBookToPastReads={this.addBookToPastReads.bind(this)}
          addBookToFavorites={this.addBookToFavorites.bind(this)}
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

  // this function is used in several places throughout the app to dismiss
  // the dropdown from the navbar showing search results.
  clearSearchResults () {
    this.setState({
      navbarSearchResults: [],
      navbarSearchText: ''
    });
  }

  removeBookFromQueue (isbn) {
    // go through current queue and filter out isbn
    const filtered =
      this.state.loggedInUser.queue.filter(book => book._id !== isbn);
    axios.delete(`/users/${this.state.loggedInUser.fbid}/queue/${isbn}`)
      .then(book => {
        const newState = Object.assign({}, this.state.loggedInUser);
        newState.queue = filtered;
        this.setState({
          loggedInUser: newState
        });
      });
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

  addBookToPastReads (isbn) {
    // check to see if book is already in users pastReads
    for (let i = 0; i < this.state.loggedInUser.pastReads.length; i++) {
      if (this.state.loggedInUser.pastReads[i]._id === isbn) {
        // book already is in pastReads do not add again
        return;
      }
    }
    // book is not in pastReads go ahead and add

    axios.post(`/users/${this.state.loggedInUser.fbid}/pastReads/${isbn}`)
    .then( response => {
      console.log('RESPONSE: ', response)
      const newState = Object.assign({}, this.state.loggedInUser);
      newState.pastReads = newState.pastReads.concat(response.data);
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
          .then(deleted => {
            return axios.post(`/users/${userid}/queue/${isbn}?current=true`)
          })
          .then(added => {
            const book = added.data;
            const newState = Object.assign({}, this.state.loggedInUser);
            // make a filtered array that doesn't have originial book in it
            const filtered = this.state.loggedInUser.queue.filter(book => {
              return book._id !== isbn;
            });
            // concat the added book to the front of filtered
            newState.queue = [book].concat(filtered);
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
      newState.queue = [book].concat(newState.queue);
      this.setState({
        loggedInUser: newState
      })
    })
  }

  removeBookFromFavorites (isbn) {
    // removesBookFromFavorites
    const loggedInUser = this.state.loggedInUser;
    axios.delete(`/users/${loggedInUser.fbid}/favorites/${isbn}`)
      .then(deleted => {
        const filtered = loggedInUser.favorites.filter(book => {
          return book._id !== isbn;
        });
        const newState = Object.assign({}, this.state.loggedInUser);
        newState.favorites = filtered;
        this.setState({
          loggedInUser: newState
        });
      })

  }

  removeBookFromPastReads (isbn) {
    // removesBookFromPastReads
    const loggedInUser = this.state.loggedInUser;
    axios.delete(`/users/${loggedInUser.fbid}/pastReads/${isbn}`)
      .then(deleted => {
        const filtered = loggedInUser.pastReads.filter(book => {
          return book._id !== isbn;
        });
        const newState = Object.assign({}, this.state.loggedInUser);
        newState.pastReads = filtered;
        this.setState({
          loggedInUser: newState
        });
      })
  }

  addBookToFavorites (isbn) {
    // first make sure book is not already in favorites
    for (let i = 0; i < this.state.loggedInUser.favorites.length; i++) {
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

  // function to increase a users book read total
  increaseBookCount () {
    axios.post(`/users/${this.state.loggedInUser.fbid}/count`)
      .then(res => {
        console.log('res: ', res);
        let newState = Object.assign({}, this.state.loggedInUser);
        newState.stats++;
        this.setState({
          loggedInUser: newState
        })
      })
      .catch(console.log)
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
          // edit page needs queue and favorites lists and also how to
          // modify them
          return React.cloneElement(child, {
            queue: this.state.loggedInUser.queue,
            favorites: this.state.loggedInUser.favorites,
            pastReads: this.state.loggedInUser.pastReads,
            removeBookFromFavorites: this.removeBookFromFavorites.bind(this),
            removeBookFromQueue: this.removeBookFromQueue.bind(this),
            makeCurrentBook: this.makeCurrentBook.bind(this),
            removeBookFromPastReads: this.removeBookFromPastReads.bind(this)
          });
          break;
        case "Book" :
          // book needs to be able to add books to users queue and favorites
          // and be able to clear search bar
          return React.cloneElement(child, {
            clearSearchResults: this.clearSearchResults.bind(this),
            addBookToFavorites: this.addBookToFavorites.bind(this),
            makeCurrentBook: this.makeCurrentBook.bind(this),
            addBookToQueue: this.addBookToQueue.bind(this),
            addBookToPastReads: this.addBookToPastReads.bind(this)
          })
          break;
        case "UserProfile" :
          // userprofile needs information about the currently logged in user
          return React.cloneElement(child, {
            loggedInUser: this.state.loggedInUser,
            increaseBookCount: this.increaseBookCount.bind(this)
          });
          break;
        case "Author" :
          return React.cloneElement(child, {
            clearSearchResults: this.clearSearchResults.bind(this)
          })
          break;
        default :
          return child;
      }
    });
  }

}

// export the class so other files can work with it.
module.exports = App;
