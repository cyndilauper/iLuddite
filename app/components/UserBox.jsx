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
              {props.user.displayName}
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
              {props.user.stats}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 incrementBookCount">
              <button 
                className="btn btn-default btn-info btn-sm" 
                role="button"
                onClick={props.increaseBookCount}
              >
                Increase Book Count
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserBox.defaultProps = {
  user: {
    image: '../public/assets/default-img.jpg',
    displayName: 'Ducky McDuckerson',
    location: 'Mars w/ Elon Musk',
    stats: 'ate 43 martians'
  }
}

module.exports = UserBox;
