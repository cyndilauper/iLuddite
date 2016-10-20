const React = require('react');
const ProfileQueue = require('./ProfileQueue');
const UserBox = require('./UserBox');
const CurrentBook = require('./CurrentBook');
const DisplayFriends = require('./DisplayFriends');

class UserProfile extends React.Component {
  render(){
    return (
      <div className="container">

          <UserBox user={this.props.user}/>
          <CurrentBook currentBook={this.props.currentBook}/>
          <ProfileQueue bookQueue={this.props.bookQueue}/>
          <DisplayFriends friendQueue={this.props.friendQueue}/>
      </div>
    );
  }
}

module.exports = UserProfile;
