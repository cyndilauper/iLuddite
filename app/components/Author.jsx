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
  createMarkup(html){
    return {__html: html}
  }
  componentDidMount () {
    this.props.clearSearchResults();
    // as soon as the component mounts fetch the author it is
    // supposed to display

    axios.get(`/api/authors/${this.props.params.authorid}`)
    .then(response => {
      console.log(response.data)
      this.setState({
        author: response.data
      });
      console.log(this.state.author.description)
      this.state.author.description.replace('<br><br>','\n')
    })
    axios.get(`/api/authors/${this.props.params.authorid}/books`)
    .then(response => {
      this.setState({
        books: response.data
      })
      console.log(this.state.books)
    })

  }
  render(){
    const authorBookList = this.state.books.map((book, idx) => {
      return (
        <div className="col-md-2 col-sm-2 col-xs-2 readingColumn">
          <a href={book.link}>
            <img src={book.image} className='img-responsive bookPhoto'/>
            <p>{book.title}</p>
          </a>
        </div>
      );
    });
    if(!this.state.author ){
      return (<div>What?</div> )
    } else{
      return (
      <div className="authorContainer">
        <div className="authorRow">
          <div className="authorCol col-md-6">
            <img className="authorImg" src={this.state.author.photoPath}/>
          </div>

          <div className="authorCol2 col-md-6">
            <h2>{this.state.author.name}</h2>
            <h4>About the Author</h4>
            <div dangerouslySetInnerHTML={this.createMarkup(this.state.author.description)} />
            <br/>
          </div>
        </div>
        <h4 className='listName'>Books By This Author</h4>
        <div className='author-books-list col-md-12'>
           {authorBookList}
        </div>
      </div>
      )
    }
  }
}


module.exports = Author;
