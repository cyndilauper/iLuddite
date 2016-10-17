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
          <span className="glyphicon glyphicon-remove"></span>
        </div>
        <div className="col-md-10">
          {props.book.title} - {props.book.author}
        </div>
        <div className="col-md-1">
          <span className="glyphicon glyphicon-book"></span>
        </div>
      </div>
    </li>
  );
};

module.exports = QueueListItem;
