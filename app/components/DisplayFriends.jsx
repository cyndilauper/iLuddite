const React = require('react');

const Friends = (props) => {

  console.log('props.friendQueue is', props.friendQueue);

const friendQueue = props.friendQueue.map((friend, idx) => {
    return (
    <div className="col-md-2 friendsColumn">
      <Link to="#"><img src={friend.image} className='img-responsive profilePhoto friendsPhoto'/></Link> 
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

module.exports = Friends;
