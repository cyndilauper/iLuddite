const React = require('react');

const SearchListItem = (props) => {
 
  return (
    <li className="search-list-item list-group-item">
      <div className="row">
        <div className="col-md-2">
          <img src="https://images.gr-assets.com/books/1355929358m/8921.jpg" alt=""/>
        </div>
        <div className="col-md-7">
          <h4>Book Title <small> - Author name here </small></h4>
          <p>This would be a quick description of the text.</p>
        </div>
        <div className="col-md-3">
          <div className="button-container">
            <button className="btn btn-primary">
              <span className="glyphicon glyphicon-plus">&nbsp;</span>
              Add to Queue
            </button>
            <button className="btn btn-primary">
              <span className="glyphicon glyphicon-book">&nbsp;</span>
              Make current book
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

module.exports = SearchListItem;
