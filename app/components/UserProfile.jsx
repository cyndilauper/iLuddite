const React = require('react');
const ProfileQueue = require('./ProfileQueue');
const UserBox = require('./UserBox');
const CurrentBook = require('./CurrentBook');
const DisplayFriends = require('./DisplayFriends');
const axios = require('axios');

class UserProfile extends React.Component {
  constructor (props) {
    super(props);
    // App passes in the currently logged in user if the user id
    // in the route matches the id of the user then the user 
    // the profile needs to show is the logged in user
    if (this.props.params.userid == this.props.loggedInUser.fbid) {
      this.state = {
        user: this.props.loggedInUser
      };
      // otherwise we will set to an empty user
    } else {
      this.state = {
        user: {
          fbid: '',
          queue: [],
          friends: [],
          image: '',
          displayName: '',
          stats: '',
          location: 'Austin, TX'
        }
      }
    }
  }

  componentDidMount () {
    // if for whatever reason we don't have a user then using the
    // params in the url bar make a request for the user.
    if (!this.state.user.fbid) {
      axios.get(`http://localhost:3000/users/${this.props.params.userid}`)
        .then((response => {
          this.setState({
            user: response.data
          });
        }));
    }
  }

  componentWillReceiveProps(nextProps) {
    // this function is called when a component is about to receive new props
    // This case happens when the user is looking at a profile and clicks a 
    // friend of the current user. The component doesn't re mount or update
    // but new route props are handed in.
    // Again if the id in the new props is the same as the logged in user
    // just set state to that user
    if (nextProps.params.userid === this.props.loggedInUser.fbid) {
      this.setState({
        user: this.props.loggedInUser
      })
    } else {
      axios.get(`http://localhost:3000/users/${nextProps.params.userid}`)
        .then((response => {
          this.setState({
            user: response.data
          });
        }));
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
