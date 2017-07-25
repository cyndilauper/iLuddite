import React from 'react';
import Queue from './Queue';
import Favorites from './Favorites';

class EditPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
      </div>
    );
  }
}

EditPage.defaultProps = {
  queue: [],
  favorites: [],
};

export default EditPage;
