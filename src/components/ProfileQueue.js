import { Link } from 'react-router-dom';
import React from 'react';

const ProfileQueue = (props) => {
// since the queue could get really long we only want to display up to 6 books
  const profileQueue = props.bookQueue.slice(0, 6).map((book, idx) => (
    <div className="col-md-2 col-sm-2 col-xs-2 readingColumn">
      <Link to={`/books/${book._id}`}>
        <img src={book.thumbnailPath} className="img-responsive bookPhoto" />
      </Link>
    </div>
    ));

  return (
    <div className="wrappingDiv">
      <div className="row readingTitleRow">
        <div className="col-xs-12 readingHeader">
          Reading Queue
        </div>
      </div>
      <div className="row readingRow">
        <div className="col-xs-12">
          <div className="row">
            {profileQueue}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileQueue;
