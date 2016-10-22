const React = require('react');
const QueueListItem = require('./QueueListItem');

const Queue = (props) => {
  // props.queue is a list of all the users books in their queue
  // the first one in the queue is their currently reading book 
  // so it needs different styling.
  const queue = props.queue.map((book, idx) => {
    if (idx === 0) {
      return (
        <QueueListItem 
          currentBook={true}
          book={book}
        />
      );
    } else {
      return (
        <QueueListItem
          currentBook={false}
          book={book}
        />
      );
    }
  });
  return (
    <div className="col-md-6">
      <h2>Queue:</h2>
      <ul className="list-group">
        {queue}
      </ul>
    </div>
  );
};

Queue.defaultProps = {
  queue: []
};

module.exports = Queue;
