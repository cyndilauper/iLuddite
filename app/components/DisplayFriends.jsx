const React = require('react');
import { Link } from 'react-router';

const Friends = (props) => {

const friendQueue = props.friendQueue.map((friend, idx) => {
    return (
    <div className="col-md-2 friendsColumn">
      <Link to={`/users/${friend.fbid}`}><img src={friend.image} className='img-responsive profilePhoto friendsPhoto'/></Link> 
    </div>
    );
  })

  return (
   <div className="wrapping div">
    <div className="row friendsTitleRow">
      <div className="col-xs-12 friendsHeader">
          Friends
      </div>
    </div>
    <div className="row friendsRow">
        <div className="row">
            <div className="row">
              {friendQueue}
            </div>
        </div>
    </div>
   </div>
  );
};

Friends.defaultProps = {
  friendQueue: [
    {
      image: './assets/webpack.config.jpg'
    },
    {
      image: './assets/webpack.config.jpg'
    },
    {
      image: './assets/webpack.config.jpg'
    },
    {
      image: './assets/webpack.config.jpg'
    },
    {
      image: './assets/webpack.config.jpg'
    },
    {
      image: './assets/webpack.config.jpg'
    }
  ]
}

module.exports = Friends;
