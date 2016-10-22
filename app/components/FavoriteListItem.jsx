const React = require('react');

const FavoriteListItem = (props) => {
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-md-1">
          <span className="glyphicon glyphicon-remove"></span>
        </div>
        <div className="col-md-10">
          {props.book.title} - {props.book.author}
        </div>
      </div>
    </li>
  );
};

FavoriteListItem.defaultProps = {
  book:{
    title: 'Couldn\'t find title',
    author: 'Couldn\'t find author',
  }
}

module.exports = FavoriteListItem;
