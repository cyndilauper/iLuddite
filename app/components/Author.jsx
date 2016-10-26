const React = require('react');
const Link = require('react-router').Link;
const axios = require('../axios');

class Author extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      author: null,
      books: []
    }
  }

  componentDidMount () {
    this.props.clearSearchResults();
    // as soon as the component mounts fetch the author it is
    // supposed to display
    
    axios.get(`/authors/${this.props.params.authorid}`)
    .then(response => {
      console.log(response.data)
      this.setState({
        author: response.data
      });
    })
    axios.get(`/authors/${this.props.params.authorid}/books`)
    .then(response => {
      this.setState({
        books: response.data
      })
      console.log(this.state.books)
    })
      
  }
  render(){
    if(!this.state.author ){
      return (<div>What?</div> ) 
    } else{
      return (
        <div>
          <div>{this.state.author.name}</div>
          {this.state.books.map(book => 
            <div>{book.title}</div>
          )}
        </div>
      )
    }
  }
}


module.exports = Author;