const React = require('react');

const UserBox = (props) => {
  return (
    <div className="col-sm-6 profileColumn">
      <div className="row">
        <div className="col-xs-7 profilePhotoColumn">
          <img src={props.user.image} className="img-responsive profilePhoto"/>
        </div>
        <div className="col-xs-5 userInfoColumnn">
          <div className="row">
            <div className="col-xs-12 userName">
              {props.user.name}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 userLocation">
               {props.user.location}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 userBooksRead">
              <br></br>
              <div className="bookCountTitle"> Book Count</div>
              {props.user.booksRead}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

module.exports = UserBox;
