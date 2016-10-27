const React = require('react');
const ProfileQueue = require('./ProfileQueue');
const ProfileFinished = require('./ProfileFinished');
const UserBox = require('./UserBox');
const CurrentBook = require('./CurrentBook');
const DisplayFriends = require('./DisplayFriends');
const Carousel = require('./Carousel')
const axios = require('../axios');

class UserProfile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user: {
        queue: [],
        finished: []

      }
    };
  }

  componentDidMount () {
    // fetch the user to display
    if (!this.state.user.fbid) {
      axios.get(`/users/${this.props.params.userid}`)
        .then((response => {
          this.setState({
            user: response.data
          });
        }));
    }
  }

  // This lifecycle method will get called anytime the user is already on
  // this component and clicks one of their friends which shows this same
  // component with the friends data. When this happens this component needs
  // to do a get request to get the new users information, and change state.
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
        <UserBox
          increaseBookCount={this.props.increaseBookCount}
          user={this.state.user} />
        <CurrentBook currentBook={this.state.user.queue[0]}/>
        <ProfileQueue bookQueue={this.state.user.queue.slice(1)} />
        <ProfileFinished finishedQueue={this.state.user.finished} />
        <Carousel />
        <DisplayFriends friendQueue={this.state.user.friends}/>
      </div>
    );
  }
}

module.exports = UserProfile;
