const React = require('react');
const ProfileQueue = require('./ProfileQueue');
const UserBox = require('./UserBox');
const CurrentBook = require('./CurrentBook');
const DisplayFriends = require('./DisplayFriends');

class UserProfile extends React.Component {
  constructor (props) {
    super(props);
    // if the current profile is the logged in user
    // we already have their info otherwise 
    // it needs to be fetched when component is mounted
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
    // fetch the user from server
    // in our case we are only going to set the initial user.
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
