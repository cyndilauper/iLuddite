const React = require('react');

const QueueListItem = (props) => {

  // if currentBook === true then li needs class active
  const className = props.currentBook 
    ? 'list-group-item active'
    : 'list-group-item';
  function finishAndIncrease() { //Compund function that adds to Finished queue and increments book count by one
    props.addBookToFinished.call(null, props.book._id);
    props.increaseBookCount();
  }
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
            onClick={finishAndIncrease}
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
