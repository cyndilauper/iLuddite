const React = require('react');

const FavoriteListItem = (friendArray) => {
  return (
   <div className="wrapping div">
    <div className="row friendsTitleRow">
            <div className="col-xs-12 friendsHeader">
                Friends
            </div>
        </div>
        <div className="row friendsRow">
            {/*<div className="col-xs-1 friendsArrowColumn">
                <div className="friendsArrowCircle">
                    <span className="glyphicon glyphicon-chevron-left"></span>
                </div>
            </div>*/}
            <div className="col-xs-10">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="row">
                            <div className="col-xs-6 friendsColumn">
                                <a href="#"><img src={friendArray[0].image} className='img-responsive profilePhoto friendsPhoto'/></a> 
                            </div>
                            <div className="col-xs-6 friendsColumn">
                                <a href="#"><img src={friendArray[1].image} className='img-responsive profilePhoto friendsPhoto'/></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="row">
                            <div className="col-xs-6 friendsColumn">
                                <a href="#"><img src={friendArray[2].image} className='img-responsive profilePhoto friendsPhoto'/></a>
                            </div>
                            <div className="col-xs-6 friendsColumn">
                                <a href="#"><img src={friendArray[3].image} className='img-responsive profilePhoto friendsPhoto'/></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="row">
                            <div className="col-xs-6 friendsColumn">
                                <a href="#"><img src={friendArray[4].image} className='img-responsive profilePhoto friendsPhoto'/></a>
                            </div>
                            <div className="col-xs-6 friendsColumn">
                                <a href="#"><img src={friendArray[5].image} className='img-responsive profilePhoto friendsPhoto'/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className="col-xs-1 friendsArrowColumn">
                <div className="friendsArrowCircle">
                    <span className="glyphicon glyphicon-chevron-right"></span>
                </div>
            </div>*/}
        </div>
    </div>
  );
};

module.exports = FavoriteListItem;
