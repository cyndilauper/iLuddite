const React = require('react');

const CurrentBook = (props) => {
  return (
    <div className="col-sm-6 currentColumn">
      <div className="row">
        <div className="col-xs-12 currentHeader">
            Currently Reading
        </div>
      </div>
        <div className="row">
            <div className="col-xs-4 currentPhotoColumn">
                <a href="#"><img src={props.currentBook.image}className="img-responsive bookPhoto"/></a>
            </div>
            <div className="col-xs-8 currentInfoColumn">
                <div className="row">
                  <div className="col-xs-12 currentTitle">
                    {props.currentBook.title}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 currentAuthor">
                    {props.currentBook.author}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 currentBio">
                    {props.currentBook.description}
                  </div>
                </div>
            </div>
        </div>
    </div>
  );
};

module.exports = CurrentBook;
