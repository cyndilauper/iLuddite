import React from 'react';

const QueueListItem = (props) => {
  // if currentBook === true then li needs class active
  const className = props.currentBook
    ? 'list-group-item active'
    : 'list-group-item';
  return (
    <li className={className}>
      <div className="row">
        <div className="col-md-1">
          <span
            className="glyphicon glyphicon-remove"
            onClick={props.removeBookFromQueue.bind(null, props.book._id)}
          />
        </div>
        <div className="col-md-10">
          {props.book.title} - {props.book.author}
        </div>
        <div className="col-md-1">
          <span
            className="glyphicon glyphicon-book"
            onClick={props.makeCurrentBook.bind(null, props.book._id)}
          />
        </div>
      </div>
    </li>
  );
};

QueueListItem.defaultProps = {
  makeCurrentBook() {},
};

export default QueueListItem;
