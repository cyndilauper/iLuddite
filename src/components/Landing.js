// This file isn't in use anymore

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

      <p className="title">iLuddite</p>

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
              <button
                className="btn btn-primary"
                onClick={this.signIn.bind(this)}
              >
                Sign-in/Sign up with facebook
              </button>
            </div>
          </div>
        </div>

  </div>
    );
  }

  // this function sends a request to server to authorize user with facebook
  // once a request comes back with a user id send them to /users/:userid
  signIn () {
    // this would be the action to execute to auth the user with facebook
    // once we get back a response we set the state of app with the user
    // and move to the next route.

    // first setState
    this.props.handleUserLogin(this.props.route.data);
    const path = `/users/${this.props.route.data.fbid}`;

  }
}

export default Landing;
