const React = require('react');

class Landing extends React.Component {
  render () {
    return (
    <div>
      <div className="main-body">

      </div>

      <p className="title">ILuddite</p>

        <div className="intro col-md-4 col-md-offset-7 ">

          <div className ="well">
            <h2 className="header">Preface</h2>
            Welcome to ILuddite, the reading application.  Lorem ipsum yada yada yada.  We have books.  
            Lots of books, the best books You wouldn't believe the kind of books we have.  
            Anyway what was I saying I like books because they have lots of pages.  Pages are the foundation of books. 
             America needs to make more books because we need to make more pages. 
              1 + 1 = 2, right? It's so simple but crooked Hilary would never think that.

              <div className="button">

              <button>Sign-in/Sign up with facebook </button>  
            </div>
          </div>
        </div>

  </div>
    );
  }
}

module.exports = Landing;
