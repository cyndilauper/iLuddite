const React = require('react');
const Link = require('react-router').Link;
const axios = require('../axios');

class Author extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      author: {}
    }
  }

  componentDidMount () {
    // clear out any search results that might still 
    // be showing (this is kinda hacky and probably
    // needs to be done a little differently TODO)
    this.props.clearSearchResults();
    // as soon as the component mounts fetch the author it is
    // supposed to display
    axios.get(`/authors/${this.props.params.authorid}`)
      .then(response => {
        this.setState({
          author: response.data[0]
        });
      })
  }
  render(){
    return <div>{this.state}</div>  
  }
}


module.exports = Author;
