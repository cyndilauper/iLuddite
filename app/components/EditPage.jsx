const React = require('react');
const Queue = require('./Queue');
const Favorites = require('./Favorites');

class EditPage extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    return (
      <div className="row">
        <Queue queue={this.props.queue} />
        <Favorites favorites={this.props.favorites} />
      </div>
    );
  }
};

EditPage.defaultProps = {
  queue: [],
  favorites: []
};

module.exports = EditPage;
