const React = require('react');

const Friends = (props) => {

  console.log('props.friendQueue is', props.friendQueue);

const friendQueue = props.friendQueue.map((friend, idx) => {
    console.log('friend is', friend);
    return (
    <div className="col-md-2 friendsColumn">
      <a href="#"><img src={friend.image} className='img-responsive profilePhoto friendsPhoto'/></a> 
    </div>
    );
  })

  console.log('hey friendQueue is', friendQueue);
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

module.exports = Friends;
