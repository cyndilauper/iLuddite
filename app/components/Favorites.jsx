const React = require('react');
const FavoriteListItem = require('./FavoriteListItem');

const Favorites = (props) => {
  // props.favorites is a list of all the books that are in a 
  // users favorites list
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

Favorites.defaultProps = {
  favorites: []
};

module.exports = Favorites;
