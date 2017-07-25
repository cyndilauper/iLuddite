import React from 'react';

const FavoriteListItem = props => (
  <li className="list-group-item">
    <div className="row">
      <div className="col-md-1">
        <span
          className="glyphicon glyphicon-remove"
          onClick={props.removeBookFromFavorites.bind(null, props.book._id)}
        />
      </div>
      <div className="col-md-10">
        {props.book.title} - {props.book.author}
      </div>
    </div>
  </li>
  );

FavoriteListItem.defaultProps = {
  book: {
    title: 'Couldn\'t find title',
    author: 'Couldn\'t find author',
  },
};

export default FavoriteListItem;
