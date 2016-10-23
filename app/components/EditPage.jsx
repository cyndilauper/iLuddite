const React = require('react');
const Queue = require('./Queue');
const Favorites = require('./Favorites');

const EditPage = (props) => {
  return (
    <div className="row">
      <Queue queue={props.queue} />
      <Favorites favorites={props.favorites} />
    </div>
  );
};

EditPage.defaultProps = {
  queue: [],
  favorites: []
};

module.exports = EditPage;
