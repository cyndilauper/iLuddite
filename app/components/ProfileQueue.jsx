const React = require('react');
import { Link } from 'react-router';
import { DropdownButton } from 'react-bootstrap';
var Masonry = require('react-masonry-component');

var masonryOptions = {
    transitionDuration: 0
};

const ProfileQueue = React.createClass({

    render: function () {
      const profileQueue = this.props.bookQueue.slice(0, 6).map((book, idx) => {
        return (
          <li className="image-element-class">
            <Link to={`/books/${book._id}`}>
              <img src={book.thumbnailPath} className='bookPhoto'/>
            </Link>
          </li>
        );
      });

      return (
          <DropdownButton title="Queue" className="droppy">
            <Masonry
                className={'my-gallery-class'} // default ''
                elementType={'ul'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
            >
                {profileQueue}
            </Masonry>
          </DropdownButton>
      );
    }
});

module.exports = ProfileQueue;
