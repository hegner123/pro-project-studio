import React, { Component } from "react";
import { Link } from "react-router-dom";



class Navbar extends Component {
  render() {
    return (
<nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
  <a className="navbar-brand" href="/">Pro-Project Studio</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to="/what" className="nav-link">
          What
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/image" className="nav-link">
          Why
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/how" className="nav-link">
          How
        </Link>
      </li>
    </ul>
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
      <Link to="/register" className="nav-link">
                Register
              </Link>
      </li>
      <li className="nav-item">
      <Link to="/login" className="nav-link">
                Login
              </Link>
      </li>

    </ul>
  </div>
</nav>

    );
  }
}

export default Navbar;
