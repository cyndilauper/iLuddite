const React = require('react');

class Button extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      glyph: props.glyph
    };
  }

  setClicked() {
    this.props.click(this.props.bookid);

    var newText = this.state.type === 'To Queue' ? 'Added!' : 'Now Current!';

    this.setState({
      type: newText,
      glyph: 'glyphicon-ok'
    });
  }

  render() {
    var currentBookId = this.props.loggedInUser.queue[0].id;
    var buttonsBookId = this.props.bookid;

    return (
      <button
        className="btn btn-primary"
        onClick={this.setClicked.bind(this)}>
        <span className={`glyphicon ${this.state.glyph}`}>&nbsp;</span>
        {this.state.type}
      </button>
    );
  }

}

module.exports = Button;
