const React = require('react');
const Link = require('react-router').Link;

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
                <Link to="#"><img src={props.currentBook.image}className="img-responsive bookPhoto"/></Link>
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
                    {props.currentBook.summary}
                  </div>
                </div>
            </div>
        </div>
    </div>
  );
};

// defaults
CurrentBook.defaultProps = {
  currentBook: {
      image: './assets/webpack.config.jpg',
    title: 'Can\'t find your gosh-darned book!',
    author: 'Who the heck knows?',
    summary: 'Try making a different book yr current book, doofus'
  }
}

module.exports = CurrentBook;
