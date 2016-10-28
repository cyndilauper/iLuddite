const React = require('react');
import { Link } from 'react-router';
import { DropdownButton } from 'react-bootstrap';
var Masonry = require('react-masonry-component');

var masonryOptions = {
  transitionDuration: 10
};

const ProfilePastReads = (props) => {
// since the queue could get really long we only want to display up to 6 books
const profilePastReads = props.pastReads.slice(0, 6).map((book, idx) => {
    return (
      <li className="image-element-class">
        <Link to={`/books/${book._id}`}>
          <img src={book.thumbnailPath} className='bookPhoto'/>
        </Link>
      </li>
    );
  });

  return(
    <DropdownButton title="Past Reads" className="droppy">
      <Masonry
          className={'my-gallery-class'} // default ''
          elementType={'ul'} // default 'div'
          options={masonryOptions} // default {}
          disableImagesLoaded={false} // default false
          updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
      >
          {profilePastReads}
      </Masonry>
    </DropdownButton>
  );

};

module.exports = ProfilePastReads;
