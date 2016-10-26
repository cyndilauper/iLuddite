const React = require('react');
const axios = require('../axios');
import { browserHistory } from 'react-router';


var Review = ({reviews, handleSubmit, handleChange, incRating, rating}) => {
  return (
    <div className="reviewContainer">
      <div className="makeReview col-md-6">
        <h3>Quick! Your Thoughts?</h3>
        <form>
          <input className="reviewForm" onChange={(e) => handleChange(e)}
           placeholder="Make it short..." />
          <div className="rateField">
            <input className= "thumbBtn" type="image" onClick={(e) => incRating(e)}
             src="http://cliparting.com/wp-content/uploads/2016/06/Facebook-thumbs-up-image-clipart.jpeg" /> 
            <div className="rateText">{rating} out of 5 Thumbs Up</div>
          </div>
          <button className="reviewBtn btn btn-info" onClick={(e) => handleSubmit(e)}>ADD REVIEW</button>
        </form>
      </div>
      <div className="readReview col-md-6">
        <h3>What Your Friends Thought:</h3>
          <div className="reviewFeed"> 
          { 
            reviews.map((rev, i) => 
              <div className="oneRev" key={i}>
                <img className="revImage" src={rev.image} />
                <div className="revRatings">{
                  [...Array(rev.rating)].map(r => 
                    <img src="http://cliparting.com/wp-content/uploads/2016/06/Facebook-thumbs-up-image-clipart.jpeg"/>)
                }</div>
                <h5 className="revText">{rev.content}</h5>
              </div>
            )
          }
          </div>
      </div>
    </div>
  )
}

module.exports = Review;
