const React = require('react');
import { Link } from 'react-router';

const SearchBox = require('./SearchBox');

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-default">
      <div className="row">
        <div className="col-md-2">
          <h2>iLuddite</h2>
        </div>
        <div className="col-md-8">
          <SearchBox 
            changeSearchText={props.changeSearchText}
            searchText={props.searchText}
            searchResults={props.searchResults}
          />
        </div>
        <div className="col-md-2">
          <Link to="/users/12345/edit">
            <span className="glyphicon glyphicon-cog"></span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

module.exports = Navbar;
