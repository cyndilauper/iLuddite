const React = require('react');
import { Link } from 'react-router';
import { DropdownButton } from 'react-bootstrap';

const ProfileQueue = (props) => {
// since the queue could get really long we only want to display up to 6 books
const profileQueue = props.bookQueue.slice(0, 6).map((book, idx) => {
    return (
      <div className="col-md-4">
        <Link to={`/books/${book._id}`}>
          <img src={book.thumbnailPath} className='bookPhoto'/>
        </Link>
      </div>
    );
  });

  console.log(props.bookQueue)

  return(
    <DropdownButton title="Queue" className="droppy">
      <div className="row">
        {profileQueue}
      </div>
    </DropdownButton>
  );

};

module.exports = ProfileQueue;
