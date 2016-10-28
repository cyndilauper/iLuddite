const React = require('react');
import { Link } from 'react-router';

const SearchBox = require('./SearchBox');

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-default">
      <div className="row navbarWrap">
        <div className="col-md-2">
          <a href="/">
            <h3>iLuddite 2.0</h3>
          </a>
        </div>
        <div className="col-md-8">
          <SearchBox
            changeSearchText={props.changeSearchText}
            searchText={props.searchText}
            searchResults={props.searchResults}
            handleSearchSubmit={props.handleSearchSubmit}
            addBookToQueue={props.addBookToQueue}
            addBookToPastReads={props.addBookToPastReads}
            addBookToFavorites={props.addBookToFavorites}
            makeCurrentBook={props.makeCurrentBook}
          />
        </div>
        <div className="col-md-2">
          <Link to={`/users/${props.loggedInUserId}/edit`}>
            <span className="glyphicon glyphicon-cog"></span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

module.exports = Navbar;
