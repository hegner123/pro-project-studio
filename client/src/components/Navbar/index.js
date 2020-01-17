import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "./Group2.png";
import "./style.css";



class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
 

  render() {
    const isLoggedIn = localStorage.jwtToken;
    let button;

    if (isLoggedIn) {
      button = <li className="nav-item">
       <div className="" onClick={this.onLogoutClick} className="nav-link">
              Logout
            </div>
              </li>;
    } else {
      button = <li className="nav-item">
      <Link to="/login" className="nav-link">
                Login
              </Link>
      </li>;
    }

    return (
<nav className="navbar navbar-expand-lg navbar-dark bg-transparent">

  <a className="navbar-brand" href="/"> <img src={logo} className="logo" alt="text"/> <span>Pro-Project Studio</span></a>
  
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
      {button}

    </ul>
  </div>
</nav>

    );
  }
}





Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);

