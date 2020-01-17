import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";



class Navbar extends Component {

  //Functions for log out button
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  render() {
    //const { user } = this.props.auth;
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
      <li className="nav-item">
      <Link to="/logout" className="nav-link" onClick={this.onLogoutClick}>
                Logout
              </Link>
      </li>

      {/* <li>
      <button
              onClick={this.onLogoutClick}
              className="btn btn-dark bg-dark mt-5"
            >
              Logout
            </button>
      </li> */}

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


// export default Navbar;
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);