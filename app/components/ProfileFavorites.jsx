const React = require('react');
import { Link } from 'react-router';
import { DropdownButton } from 'react-bootstrap';

const ProfileFavorites = (props) => {
// since the queue could get really long we only want to display up to 6 books
const profileFavorites = props.favorites.slice(0, 6).map((book, idx) => {
    return (
      <Link to={`/books/${book._id}`}>
        <img src={book.thumbnailPath} className='img-responsive bookPhoto'/>
      </Link>
    );
  });

  return(
    <DropdownButton title="Favs">
      {profileFavorites}
    </DropdownButton>

  );

};

module.exports = ProfileFavorites;
