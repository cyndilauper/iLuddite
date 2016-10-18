const React = require('react');

{/* queue should be an array of all the books in this reader's queue.  We want to render images
for books 1-6, book 0 will be the current book. In this current implementation, if you were to 
editthe queue by changing CurrentBook or something, when you  refreshed or returned to this page, 
it should update the queue*/}

const ProfileQueue = (queue) => {

{/* this profile queue is possibly unnecessary, but I wanted to reflect what was in the queue
and queuelistitem react components.  Also, this should give us books 1-6 in an array, which is a little
cleaner than having someone's entire queue*/}
const profileQueue = queue.filter((book, idx) => {
  if (idx > 1 && idx < 7){
    return true;
  }
  });
  return (
    <div className ="wrappingDiv">
     <div className="row readingTitleRow">
                <div className="col-xs-12 readingHeader">
                    Reading Queue
                </div>
            </div>
            <div className="row readingRow">
                {/*<div className="col-xs-1 readingArrowColumn readingArrowColumnLeft">
                    <span className="glyphicon glyphicon-chevron-left"></span>
                </div>*/}
                <div className="col-xs-10">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="row">
                                <div className="col-xs-4 readingColumn">
                                    <a href="#"><img src={profileQueue[1].image} className='img-responsive bookPhoto'/></a>
                                </div>
                                <div className="col-xs-4 readingColumn">
                                    <a href="#"><img src={profileQueue[2].image} className='img-responsive bookPhoto'/></a>
                                </div>
                                <div className="col-xs-4 readingColumn">
                                    <a href="#"><img src={profileQueue[3].image} className='img-responsive bookPhoto'/></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="row">
                                <div className="col-xs-4 readingColumn">
                                    <a href="#"><img src={queue[4].image} className='img-responsive bookPhoto'/></a>
                                </div>
                                <div className="col-xs-4 readingColumn">
                                    <a href="#"><img src={queue[5].image} className='img-responsive bookPhoto'/></a>
                                </div>
                                <div className="col-xs-4 readingColumn">
                                    <a href="#"><img src={queue[6].image}className='img-responsive bookPhoto'/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div className="col-xs-1 readingArrowColumn readingArrowColumnRight">
                    <span className="glyphicon glyphicon-chevron-right"></span>
                </div>*/}
            </div>
      </div>
  );
};

module.exports = ProfileQueue;
