const React = require('react');
const Queue = require('./Queue');
const Favorites = require('./Favorites');
const PastReads = require('./PastReads');

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
        />
        <Favorites
          favorites={this.props.favorites}
          removeBookFromFavorites={this.props.removeBookFromFavorites}
        />
        <PastReads
          pastReads={this.props.pastReads}
          removeBookFromPastReads={this.props.removeBookFromPastReads}
        />
      </div>
    );
  }
};

EditPage.defaultProps = {
  queue: [],
  favorites: [],
  pastReads: []
};

module.exports = EditPage;
