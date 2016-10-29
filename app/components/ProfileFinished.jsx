const React = require('react');
import { Link } from 'react-router';

const ProfileFinished = (props) => {
// since the queue could get really long we only want to display up to 6 books
const profileFinished = props.finishedQueue.slice(props.indices[0], props.indices[1]).map((book, idx) => {
    return (
      <div className="col-md-2 col-sm-2 col-xs-2 readingColumn">
        <Link to={`/books/${book._id}`}>
          <img src={book.thumbnailPath} className='img-responsive bookPhoto'/>
        </Link>
      </div>
    );
  });

  return(
   <div className ="wrappingDiv">
      <div className="row readingTitleRow">
        <div className="col-xs-12 readingHeader">
          Previously Read
        </div>
      </div>
      <div className="row readingRow">
        <div className="col-xs-1 readingArrowColumn readingArrowColumnLeft">
          <span className="glyphicon glyphicon-chevron-left" onClick={props.decreaseFinishedIndices}></span>
        </div>
        <div className="col-xs-10">
          <div className="row">
            {profileFinished}
          </div>
        </div>
      <div className="col-xs-1 readingArrowColumn readingArrowColumnRight">
        <span className="glyphicon glyphicon-chevron-right" onClick={props.increaseFinishedIndices}></span>
      </div>
      </div>
    </div>
  );

};

module.exports = ProfileFinished;
