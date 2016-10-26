const React = require('react');
import { Link } from 'react-router';
import { DropdownButton } from 'react-bootstrap';

const ProfilePastReads = (props) => {
// since the queue could get really long we only want to display up to 6 books
const profilePastReads = props.pastReads.slice(0, 6).map((book, idx) => {
    return (
      <Link to={`/books/${book._id}`}>
        <img src={book.thumbnailPath} className='img-responsive bookPhoto'/>
      </Link>
    );
  });

  return(
    <DropdownButton title="Past Reads">
      {profilePastReads}
    </DropdownButton>
  );

};

module.exports = ProfilePastReads;
