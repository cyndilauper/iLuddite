const React = require('react');
import { Link } from 'react-router';

const SearchListItem = (props) => {
  return (
      <div className="row">
      <li className="search-list-item list-group-item">
        <div className="col-xs-1">
          <Link to={`/books/${props.bookid}`}>
            <img src={props.image} alt={props.title}/>
          </Link>
        </div>
        <div className="col-xs-8">
          <Link to={`/books/${props.bookid}`}>
            <h4>{`${props.title.substr(0, 50)}`}<br /><xsall>by {`${props.author.substr(0, 65)}`}</xsall></h4>
          </Link>
          <p>{props.summary}</p>
        </div>

        <div className="col-xs-3">

        <div className="row">
          <div className="col-xs-12">
            <button
              className="btn btn-primary"
              onClick={props.addBookToQueue.bind(null, props.bookid)}>

              <span className="glyphicon glyphicon-plus">&nbsp;</span>
              Add to Queue
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <button
              className="btn btn-primary"
              onClick={props.makeCurrentBook.bind(null, props.bookid)}>

              <span className="glyphicon glyphicon-book">&nbsp;</span>
              Make my Current
            </button>
          </div>
        </div>
        </div>

    </li>
    </div>
  )
}

SearchListItem.defaultProps = {
  image: '../public/assets/default-img.jpg',
  title: 'Unknown Title',
  author: 'Unknown Author',
}

module.exports = SearchListItem;
