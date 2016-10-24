const React = require('react');
import { Link } from 'react-router';

const SearchListItem = (props) => {
  return (
    <li className="search-list-item list-group-item">
      <div className="row">
        <div className="col-md-1">
          <Link to={`/books/${props.bookid}`}>
            <img src={props.image} alt={props.title}/>
          </Link>
        </div>
        <div className="col-md-7">
          <Link to={`/books/${props.bookid}`}>
            <h4>{`${props.title.substr(0, 50)}`}<br /><small>by {`${props.author.substr(0, 65)}`}</small></h4>
          </Link>
          <p>{props.summary}</p>
        </div>
        <div className="col-md-2 queue-button-col">
          <button
            className="btn btn-primary"
            onClick={props.addBookToQueue.bind(null, props.bookid)}
          >
            <span className="glyphicon glyphicon-plus">&nbsp;</span>
            Add to Queue
          </button>
        </div>
        <div className="col-md-2 current-button-col">
          <button
            className="btn btn-primary"
            onClick={props.makeCurrentBook.bind(null, props.bookid)}
          >
            <span className="glyphicon glyphicon-book">&nbsp;</span>
            Make my Current
          </button>
        </div>
      </div>
    </li>
  )
}

SearchListItem.defaultProps = {
  image: '../public/assets/default-img.jpg',
  title: 'Unknown Title',
  author: 'Unknown Author',
}

module.exports = SearchListItem;
