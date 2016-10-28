const React = require('react');

const Preview = ( { bookid } ) => {

  return (
    <div className="preview1">
      <div className="preview3">
        <div className="preview6">
          <embed width="100%" height="100%" 
          src={`https://books.google.com/books?id=${bookid}&printsec=frontcover&source=gbs_ViewAPI&output=embed#%257B%257D`} />
        </div>
      </div>
    </div>  
  );
};


module.exports = Preview;
