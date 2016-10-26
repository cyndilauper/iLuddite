const React = require('react');
const Link = require('react-router').Link;
const axios = require('../axios');

class Author extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      author: null
    }
  }

  componentDidMount () {
    this.props.clearSearchResults();
    // as soon as the component mounts fetch the author it is
    // supposed to display
    console.log(this.props)
    axios.get(`/authors/${this.props.params.authorid}`)
      .then(response => {
        console.log(response.data)
        this.setState({
          author: response.data
        });
      })
  }
  render(){
    if(!this.state.author){
      return (<div>What?</div> ) 
    } else{
      return <div>{this.state.author.name}</div>
    }
  }
}


module.exports = Author;