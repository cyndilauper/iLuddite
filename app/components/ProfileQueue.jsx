const React = require('react');

const ProfileQueue = (props) => {


console.log('props is this here', props.ProfileQueue);
const profileQueue1 = props.ProfileQueue.queue.map((book, idx) => {
  console.log('book here is', book);
  if (idx > 0 && idx < 4){
    return (
      <div className="col-xs-4 readingColumn">
        <a href="#"><img src={book.image} className='img-responsive bookPhoto'/></a>
      </div>
    );
  }
  });

const profileQueue2 = props.ProfileQueue.queue.map((book, idx) => {
  console.log('book here is', book);
  if (idx > 3 && idx < 7){
    return (
      <div className="col-xs-4 readingColumn">
        <a href="#"><img src={book.image} className='img-responsive bookPhoto'/></a>
      </div>
    );
  }
  });

  return(
   <div className ="wrappingDiv">
      <div className="row readingTitleRow">
        <div className="col-xs-12 readingHeader">
          Reading Queue
        </div>
      </div>
      <div className="row readingRow">
        <div className="col-xs-10">
          <div className="row">
            <div className="col-sm-6">
              <div className="row">
                {profileQueue1}
              </div>
            </div>
              <div className="col-sm-6">
                <div className="row">
                  {profileQueue2}
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );


console.log('profileQueue here now is', profileQueue);
};

module.exports = ProfileQueue;

