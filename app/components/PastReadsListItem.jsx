const React = require('react');

const PastReadsListItem = (props) => {
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-md-1">
          <span
            className="glyphicon glyphicon-remove"
            onClick={props.removeBookFromPastReads.bind(null, props.book._id)}
          />
        </div>
        <div className="col-md-10">
          {props.book.title} - {props.book.author}
        </div>
      </div>
    </li>
  );
};

PastReadsListItem.defaultProps = {
  book:{
    title: 'Couldn\'t find title',
    author: 'Couldn\'t find author',
  }
}

module.exports = PastReadsListItem;
