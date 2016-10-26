const React = require('react');
const FinishedItem = require('./FinishedItem');

const Finished = (props) => {
  // props.favorites is a list of all the books that are in a 
  // users favorites list
  const finished = props.finished.map(book => 
    <FinishedItem 
      book={book}
      removeBookFromFinished={props.removeBookFromFinished}/>
  );

  return (
    <div className="col-md-6">
      <h2>Finished:</h2>
      <ul className="list-group">
        {finished}
      </ul>
    </div>
  );
};

// shouldn't be necessary because we have default props in favoriteListItem
// Favorites.defaultProps = { 

// };

Finished.defaultProps = {
  finished: []
};

module.exports = Finished;
