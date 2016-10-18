const React = require('react');
const SearchListItem = require('./SearchListItem');

const SearchBox = (props) => {
  // if this component is given search results then it will render out
  // a large list of search results
  // otherwise it is simply an input box
  if (props.searchResults) {
    return (
      <ul className="search-box">
        <span className="glyphicon glyphicon-search"></span>
        <input 
          type="text"
          placeholder="Search for Books"
        />
        <SearchListItem />
        <SearchListItem />
        <SearchListItem />
      </ul>
    );
  } else {
    return (
      <div className="search-box">
        <span className="glyphicon glyphicon-search"></span>
        <input 
          type="text"
          placeholder="Search for Books"
        />
      </div>
    );
  }
}

module.exports = SearchBox;
