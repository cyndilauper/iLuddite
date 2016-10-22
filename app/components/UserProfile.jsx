const React = require('react');
const ProfileQueue = require('./ProfileQueue');
const UserBox = require('./UserBox');
const CurrentBook = require('./CurrentBook');
const DisplayFriends = require('./DisplayFriends');

class UserProfile extends React.Component {
  constructor (props) {
    super(props);
    // if the current logged in user id matches the route :userid then 
    // make current user this components user state object
    if (this.props.params.userid == this.props.loggedInUser.fbid) {
      this.state = {
        user: this.props.loggedInUser
      };
    } else {
      this.state = {
        user: {}
      }
    }
  }

  componentDidMount () {
    // if we don't have user in state fetch the user info.
    if (!this.state.user) {
      axios.get(`users/${this.props.params.userid}`)
    }
  }

  render () {
    return (
      <div className="container">
        <UserBox user={this.state.user}/>
        <CurrentBook currentBook={this.state.user.queue[0]}/>
        <ProfileQueue bookQueue={this.state.user.queue.slice(1)}/>
        <DisplayFriends friendQueue={this.state.user.friends}/>
      </div>
    );
  }
}

module.exports = UserProfile;
