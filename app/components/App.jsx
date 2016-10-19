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

  // This function is used to render out children given to App by router
  // before rendering them we inspect what type of component they are
  // and inject properties into them so that they can display all the data
  // they need.
  renderChildrenWithProps () {
    // loop through the children of App and add properties to component
    // and return a copy of it with new props.
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
