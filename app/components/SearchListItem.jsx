const React = require('react');

const SearchListItem = (props) => {
  return (
    <li className="search-list-item list-group-item">
      <div className="row">
        <div className="col-md-1">
          <img src={props.image} alt={props.title}/>
        </div>
        <div className="col-md-7">
          <h4>{props.title} <small> - {props.author} </small></h4>
          <p>{props.summary}</p>
        </div>
        <div className="col-md-2">
          <button 
            className="btn btn-primary"
            onClick={props.addBookToQueue.bind(null, props.bookid)}
          >
            <span className="glyphicon glyphicon-plus">&nbsp;</span>
            Add to Queue
          </button>
        </div>
        <div className="col-md-2">
          <button 
            className="btn btn-primary"
            onClick={props.addBookToFavorites.bind(null, props.bookid)}
          >
            <span className="glyphicon glyphicon-book">&nbsp;</span>
            Make my Current
          </button>
        </div>
      </div>
    </li>
  )
}

module.exports = SearchListItem;
