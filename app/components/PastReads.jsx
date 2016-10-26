const React = require('react');
const PastReadsListItem = require('./PastReadsListItem');

const PastReads = (props) => {
  // props.pastReads is a list of all the books that are in a
  // users pastReads list
  const pastReads = props.pastReads.map(book =>
    <PastReadsListItem
      book={book}
      removeBookFromPastReads={props.removeBookFromPastReads}
    />
  );

  return (
    <div className="col-md-4">
      <h2>Past Reads:</h2>
      <ul className="list-group">
        {pastReads}
      </ul>
    </div>
  );
};

module.exports = PastReads;
