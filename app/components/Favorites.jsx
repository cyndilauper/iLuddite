const React = require('react');
const FavoriteListItem = require('./FavoriteListItem');

const Favorites = (props) => {

  const favorites = props.favorites.map(book => 
    <FavoriteListItem book={book} />
  );

  return (
    <div className="col-md-6">
      <h2>Favorites:</h2>
      <ul className="list-group">
        {favorites}
      </ul>
    </div>
  );
};

module.exports = Favorites;
