const React = require('react');

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
        <div className="col-md-9">
          {props.book.title} - {props.book.author}
        </div>
        <div className="col-md-1">
          <span 
            className="glyphicon glyphicon-book"
            onClick={props.makeCurrentBook.bind(null, props.book._id)}
          />
        </div>
        <div className="col-md-1">
          <span 
            className="glyphicon glyphicon-ok"
            onClick={props.addBookToFinished.bind(null, props.book._id)}
          />
        </div>
      </div>
    </li>
  );
};

QueueListItem.defaultProps = {
  makeCurrentBook: function() {}
}

module.exports = QueueListItem;
