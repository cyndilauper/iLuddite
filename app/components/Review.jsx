const React = require('react');
const axios = require('../axios');

class Review extends React.Component {
  constructor(props){
    super(props)
    this.setState({
      book_id: this.props.params.bookid,
      user_id:,
      reviewForm:,
      reviewRating:
    })
  }

  // componentDidMount(){
  //   this.fetchReviews(this.state.book_id)
  // }

  // fetchReviews(bookID){
  //   axios.get(`/reviews/${bookID}`)
  //   .then( reviews => {
  //     this.setState({})
  //   })
  // }

  // handleSubmit(e){
  //   e.preventDefault()
  //   e.target.value()
  // }

  render(){
    return (
      <div className="reviewContainer">
        <div className="makeReview">
          <h3>What Did You Think?</h3>
          <form>
            <input className="reviewForm" type="text" placeholder="Let Your Friends Know What You Thought!"></input>
            
            <button className="reviewSubmit" onSubmit={this.handleSubmit.bind(this)}>Submit<button>
          <form>
        </div>

        <div className="readReview">
          <h3>What Your Friends Thought:</h3>

        </div>
      </div>
    )
  }
}
