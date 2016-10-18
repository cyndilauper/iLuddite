const React = require('react');
const

const CurrentBook = (book) => {
  return (
           <div className="col-sm-6 currentColumn">
                <div className="row">
                    <div className="col-xs-12 currentHeader">
                        Currently Reading
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-4 currentPhotoColumn">
                        <a href="#"><img src={book.image}className="img-responsive bookPhoto"/></a>
                    </div>
                    <div className="col-xs-8 currentInfoColumn">
                        <div className="row">
                            <div className="col-xs-12 currentTitle">
                                {book.title}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 currentAuthor">
                                {book.author}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 currentBio">
                                {book.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  );
};

module.exports = CurrentBook;