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
      const searchResults = this.props.searchResults.map(book => {
        let summary = book.summary || "Summary not available";
        return (
          <SearchListItem
            bookid={book._id}
            title={book.title}
            author={book.author}
            image={book.thumbnailPath}
            summary={summary.substr(0, 200)}
            addBookToQueue={this.props.addBookToQueue}
            addBookToPastReads={this.props.addBookToPastReads}
            addBookToFavorites={this.props.addBookToFavorites}
            makeCurrentBook={this.props.makeCurrentBook}
          />
        )
      })
      return (
        <ul className="search-box" onClick={this.stopBubbling.bind(this)}>
          <span className="glyphicon glyphicon-search"></span>
          <input
            type="text"
            placeholder="Search for Books"
            value={this.props.searchText}
            onChange={this.handleTextChange.bind(this)}
            onKeyPress={this.checkForEnter.bind(this)}
          />
          {searchResults}
        </ul>
      );
    } else {
      return (
        <div className="search-box" onClick={this.stopBubbling.bind(this)}>
          <span className="glyphicon glyphicon-search"></span>
          <input
            type="text"
            placeholder="Search for Books"
            value={this.props.searchText}
            onChange={this.handleTextChange.bind(this)}
            onKeyPress={this.checkForEnter.bind(this)}
          />
        </div>
      );
    }
  }

  checkForEnter (evt) {
    // if the user presses enter execute the search
    if (evt.which === 13) {
      this.props.handleSearchSubmit();
    }
  }

  handleTextChange (evt) {
    this.props.changeSearchText(evt.target.value);
  }

  // anytime the searchbox is clicked we don't want the event to bubble
  // up to App component (App component has a click event so that when
  // you click off to the side of search results it dismisses them. This
  // function is put on the search results DOM element).
  stopBubbling (evt) {
    evt.stopPropagation();
  }
}

module.exports = SearchBox;
