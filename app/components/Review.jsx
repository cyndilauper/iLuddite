const React = require('react');
const axios = require('../axios');
import { browserHistory } from 'react-router';


var Review = ({handleSubmit, handleChange}) => {
  return (
    <div className="reviewContainer">
      <div className="makeReview">
        <h3>What Did You Think?</h3>
        <form>
          <input className="reviewForm" type="text" onChange={(e) => handleChange(e)}
           placeholder="Let Your Friends Know What You Thought!" />
          <button className="reviewSubmit" onClick={(e) => handleSubmit(e)}>ADD REVIEW</button>
        </form>
      </div>
      <div className="readReview">
        <h3>What Your Friends Thought:</h3>
      </div>
    </div>
  )
}

module.exports = Review;
