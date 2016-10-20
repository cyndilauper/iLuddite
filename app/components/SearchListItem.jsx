const React = require('react');

const SearchListItem = (props) => {
 
  return (
    <li className="search-list-item list-group-item">
      <div className="row no-gutter">
        <div className="col-md-1">
          <img src="https://images.gr-assets.com/books/1355929358s/8921.jpg" alt=""/>
        </div>
        <div className="col-md-7">
          <h4>Book Title <small> - Author name here </small></h4>
          <p>This would be a quick description of the text.</p>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary">
            <span className="glyphicon glyphicon-plus">&nbsp;</span>
            Add to Queue
          </button>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary">
            <span className="glyphicon glyphicon-book">&nbsp;</span>
            Make my Current
          </button>
        </div>
      </div>
    </li>
  )
}

module.exports = SearchListItem;
