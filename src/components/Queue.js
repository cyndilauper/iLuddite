const React = require('react');
const QueueListItem = require('./QueueListItem');

const Queue = (props) => {
  // props.queue is a list of all the users books in their queue
  // the first one in the queue is their currently reading book
  // so it needs different styling.
  const queue = props.queue.map((book, idx) => {
    if (idx === 0) {
      // the first book dowsn't need a makeCurrentBook function
      // since it already is the currentBook
      return (
        <QueueListItem
          removeBookFromQueue={props.removeBookFromQueue}
          currentBook={true}
          book={book}
        />
      );
    } else {
      return (
        <QueueListItem
          removeBookFromQueue={props.removeBookFromQueue}
          makeCurrentBook={props.makeCurrentBook}
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

export default Queue;
