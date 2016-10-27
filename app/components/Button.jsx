const React = require('react');

class Button extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      glyph: props.glyph
    };
  }

  setClicked() {

    this.props.click(this.props.bookid);

    var newText = this.state.text === 'Add to Queue' ? 'Added!' : 'Now your Current!';

    this.setState({
      text: newText,
      glyph: 'glyphicon-ok'
    });
  }

  render() {
    return (
      <button
        className="btn btn-primary"
        onClick={this.setClicked.bind(this)}>
        <span className={`glyphicon ${this.state.glyph}`}>&nbsp;</span>
        {this.state.text}
      </button>
    );
  }

}

module.exports = Button;
