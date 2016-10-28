const React = require('react');

const Button = (props) => {
    // bookid will point to the book id for the book this button is on.
  var bookId = props.bookid;

    // shorten up our variables for ease of use.
  var curBookId = props.loggedInUser.queue[0]._id;
  var type = props.type;

    // inQueue will tell us if this instance of Button is connected to a book already in the queue.
  var inQueue = props.loggedInUser.queue.some(book => book._id === bookId);
  var inFavorites = props.loggedInUser.favorites.some(book => book._id === bookId);

    // the if statement below will determine the properties of this object.
      // then we will use this object to fill out the button with the correct info.
  var button = {};

  if (type === 'Make Current') {
    curBookId === bookId ? (
      button.glyph = 'glyphicon-ok',
      button.text = 'Current'
    ) : (
      button.glyph = 'glyphicon-book',
      button.text = type
    );
  } else if (type === 'To Queue') {
    inQueue ? (
      button.glyph = 'glyphicon-ok',
      button.text = 'Queued'
    ) : (
      button.glyph = 'glyphicon-plus',
      button.text = type
    );
  } else {
    inFavorites ? (
      button.glyph = 'glyphicon-ok',
      button.text = 'In Favorites'
    ) : (
      button.glyph = 'glyphicon-heart',
      button.text = type
    );
  }

  return (
      <button
        className="btn btn-primary"
        onClick={props.click.bind(null, props.bookid)}>
        <span className={`glyphicon ${button.glyph}`}>&nbsp;</span>
        {button.text}
      </button>
    );

};

module.exports = Button;
