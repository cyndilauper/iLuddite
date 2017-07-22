import { Link } from 'react-router';
const React = require('react');

const SearchBox = require('./SearchBox');

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-default">
      <div className="row">
        <div className="col-md-2">
          <a href="/">
            <h2>iLuddite</h2>
          </a>
        </div>
        <div className="col-md-8">
          <SearchBox
            changeSearchText={props.changeSearchText}
            searchText={props.searchText}
            searchResults={props.searchResults}
            handleSearchSubmit={props.handleSearchSubmit}
            addBookToQueue={props.addBookToQueue}
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

export default Navbar;
