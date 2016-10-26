const React = require('react');
const axios = require('../axios');
import { browserHistory } from 'react-router';


var Review = ({reviews, handleSubmit, handleChange}) => {
  return (
    <div className="reviewContainer">
      <div className="makeReview col-md-6">
        <h3>What Did You Think?</h3>
        <form>
          <textarea className="reviewForm" onChange={(e) => handleChange(e)}
           placeholder="Let Your Friends Know What You Thought!" />
          <button className="reviewBtn btn btn-info" onClick={(e) => handleSubmit(e)}>ADD REVIEW</button>
        </form>
      </div>
      <div className="readReview col-md-6">
        <h3>What Your Friends Thought:</h3>
          <div className="reviewFeed"> 
          { 
            reviews.map((r, i) => 
              <div className="oneRev" key={i}>
                <img className="revImage" src={r.image} />
                <h5>{r.content}</h5>
              </div>
            )
          }
          </div>
      </div>
    </div>
  )
}

module.exports = Review;
