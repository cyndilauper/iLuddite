const React = require('react');
const SearchListItem = require('./SearchListItem');

class SearchBox extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    // if this component is given search results then it will render out
    // a large list of search results
    // otherwise it is simply an input box
    if (this.props.searchResults.length) {
      // make a SearchListItem for each book in searchResults
      const searchResults = this.props.searchResults.map(book => (
        <SearchListItem />
      ))
      return (
        <ul className="search-box">
          <span className="glyphicon glyphicon-search"></span>
          <input 
            type="text"
            placeholder="Search for Books"
            value={this.props.searchText}
            onChange={this.handleTextChange.bind(this)}
          />
          {searchResults}
        </ul>
      );
    } else {
      return (
        <div className="search-box">
          <span className="glyphicon glyphicon-search"></span>
          <input 
            type="text"
            placeholder="Search for Books"
            value={this.props.searchText}
            onChange={this.handleTextChange.bind(this)}
          />
        </div>
      );
    }
  }

  handleTextChange (evt) {
    this.props.changeSearchText(evt.target.value);
  }

  // anytime the user moves away from the input clear
  clearSearchText () {

  }
  
}

module.exports = SearchBox;
