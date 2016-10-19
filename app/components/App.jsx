const React = require('react');
const Navbar = require('./Navbar');
const EditPage = require('./EditPage');

class App extends React.Component {
  render () {
    return (
      <div>
        <Navbar />
        <div className="container">
          <EditPage 
            favorites={this.props.data.favorites}
            queue={this.props.data.queue}
          />
        </div>
      </div>
    );
  }
}

// export the class so other files can work with it.
module.exports = App;
