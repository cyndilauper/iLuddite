const React = require('react');
const Navbar = require('./Navbar');

class App extends React.Component {
  render () {
    return (
      <div>
        <Navbar />
        {
          /* this.props.children is how react router drops components in our app based on different routes*/
        }
        {this.props.children}
      </div>
    );
  }
}

// export the class so other files can work with it.
module.exports = App;
