const React = require('react');

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
          <span className="glyphicon glyphicon-cog"></span>
        </div>
      </div>
    </nav>
  )
}

module.exports = Navbar;
