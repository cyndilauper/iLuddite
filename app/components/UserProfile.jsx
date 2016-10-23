const React = require('react');
const ProfileQueue = require('./ProfileQueue');
const UserBox = require('./UserBox');
const CurrentBook = require('./CurrentBook');
const DisplayFriends = require('./DisplayFriends');
const axios = require('../axios');

class UserProfile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user: {
        queue: [],

      }
    }
  }

  componentDidMount () {
    // if for whatever reason we don't have a user then using the
    // params in the url bar make a request for the user.
    if (!this.state.user.fbid) {
      axios.get(`/users/${this.props.params.userid}`)
        .then((response => {
          console.log(response)
          this.setState({
            user: response.data
          });
        }));
    }
  }

  componentWillReceiveProps(nextProps) {
    axios.get(`/users/${nextProps.params.userid}`)
      .then(response => {
        this.setState({
          user: response.data
        });
      });
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
