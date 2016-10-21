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
            Welcome to ILuddite, the reading application.  Lorem ipsum yada yada yada.  We have books.  
            Lots of books, the best books You wouldn't believe the kind of books we have.  
            Anyway what was I saying I like books because they have lots of pages.  Pages are the foundation of books. 
             America needs to make more books because we need to make more pages. 
              1 + 1 = 2, right? It's so simple but crooked Hilary would never think that.

              <div className="button">

              <button onClick={this.signIn.bind(this)}>Sign-in/Sign up with facebook </button>  
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
