const React = require('react');
const Queue = require('./Queue');
const Favorites = require('./Favorites');
const Finished = require('./Finished')

class EditPage extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    return (
      <div className="row">
        <Queue 
          queue={this.props.queue}
          removeBookFromQueue={this.props.removeBookFromQueue}
          makeCurrentBook={this.props.makeCurrentBook}
          addBookToFinished={this.props.addBookToFinished}
        />
        <Favorites 
          favorites={this.props.favorites}
          removeBookFromFavorites={this.props.removeBookFromFavorites}
        />
        <Finished 
          finished={this.props.finished}
          removeBookFromFinished={this.props.removeBookFromFinished}
        />
      </div>
    );
  }
};

EditPage.defaultProps = {
  queue: [],
  favorites: [],
  finished: []
};

module.exports = EditPage;
