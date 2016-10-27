const React = require('react');
import { Link } from 'react-router';
const Button = require('./Button');


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
            <Button
              bookid={props.bookid}
              click={props.addBookToQueue.bind(null)}
              glyph={'glyphicon-plus'}
              text={'Add to Queue'} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <Button
              bookid={props.bookid}
              click={props.makeCurrentBook.bind(null)}
              glyph={'glyphicon-book'}
              text={'Make my Current'} />
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
