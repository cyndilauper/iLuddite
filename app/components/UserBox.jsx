const React = require('react');

const UserBox = (user) => {
  return (

        <div className="col-sm-6 profileColumn">
        <div className="row">
            <div className="col-xs-7 profilePhotoColumn">
                <img src={user.image} className="img-responsive profilePhoto"/>
            </div>
            <div className="col-xs-5 userInfoColumnn">
                <div className="row">
                    <div className="col-xs-12 userName">
                        {user.name}
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 userLocation">
                         {user.location}
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 userBooksRead">
                        {user.bookCount}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

module.exports = UserBox;
