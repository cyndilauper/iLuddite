const React = require('react');

const Preview = (props) => {
  return (
    <div className="previewContainer">
      <iframe frameborder="0" width="100%" height="100%" 
      src="https://books.google.com/books?id=VpNa9UckT24C&amp;printsec=frontcover&amp;source=gbs_ViewAPI&amp;output=embed#%257B%257D">
      </iframe>
    </div>
  );
};


module.exports = Preview;
