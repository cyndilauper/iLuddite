const React = require('react');
const Navbar = require('./Navbar');
const EditPage = require('./EditPage');

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      queue: this.props.route.data.queue,
      favorites: this.props.route.data.favorites
    };
  }

  render () {
    return (
      <div>
        <Navbar />
        <div className="container">
          {this.renderChildrenWithProps()}
        </div>
      </div>
    );
  }

  renderChildrenWithProps () {
    // loop over the this.props.children and check the childs type
    // if it is an EditPage component give them our queue and favorites
    return React.Children.map(this.props.children, (child) => {
      if (child.type.name === "EditPage") {
        return React.cloneElement(child, {
          queue: this.state.queue,
          favorites: this.state.favorites
        })
      return child;
      }
    });
  }
}

// export the class so other files can work with it.
module.exports = App;
