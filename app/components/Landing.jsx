const React = require('react');
import { browserHistory } from 'react-router';
const axios = require('axios');

class Landing extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
    <div>
      <div className="main-body">

      </div>

      <p className="title">ILuddite</p>

        <div className="intro col-md-4 col-md-offset-7 ">

          <div className ="well">
            <h2 className="header">Preface</h2>
            Welcome to ILuddite, a place for you and your reading habit.  
            From our site you can keep track of the books you're reading,
            what your friends are reading, and what your favorite books are. 
            We're making reading social for bookworms, so you'll always have
            something on your reading list when you reach the end of that page-turner.
            <div class="tryout"> <br/>Want to try it out? </div>
              <div className="button">
              <button className="btn btn-primary" onClick={this.signIn.bind(this)}>Sign-in/Sign up with facebook </button>  
            </div>
          </div>
        </div>

  </div>
    );
  }

  // this function sends a request to server to authorize user with facebook
  // once a request comes back with a user id send them to /users/:userid
  signIn () {
    const path = '/users/1';
    browserHistory.push(path);
  }
}

module.exports = Landing;
