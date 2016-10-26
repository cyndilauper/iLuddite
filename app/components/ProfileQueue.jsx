const React = require('react');
import { Link } from 'react-router';
import { DropdownButton } from 'react-bootstrap';

const ProfileQueue = (props) => {
// since the queue could get really long we only want to display up to 6 books
const profileQueue = props.bookQueue.slice(0, 6).map((book, idx) => {
    return (
      <Link to={`/books/${book._id}`}>
        <img src={book.thumbnailPath} className='img-responsive bookPhoto'/>
      </Link>
    );
  });

  console.log(props.bookQueue)

  return(
    <DropdownButton title="Queue">
      {profileQueue}
    </DropdownButton>
  );

};

module.exports = ProfileQueue;
