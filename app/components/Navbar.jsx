const React = require('react');

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-default">
      <div className="row">
        <div className="col-md-2">
          <h2>iLuddite</h2>
        </div>
        <div className="col-md-8">
          <input 
            type="text"
            className="form-control"
            placeholder="Search for Books"
          />
        </div>
        <div className="col-md-2">
          <span className="glyphicon glyphicon-cog"></span>
        </div>
      </div>
    </nav>
  )
}

module.exports = Navbar;
