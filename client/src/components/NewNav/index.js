import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import logo from "./Group2.png";
import { Link } from "react-router-dom";
import "./style.css";

class NewNav extends Component {



    onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutUser();
    };

    render() {
      const { user } = this.props.auth;
      const isLoggedIn = localStorage.jwtToken;
      let authArea;

      if (isLoggedIn) {
        authArea =
        <NavDropdown title={user.firstName} id="basic-nav-dropdown" bsPrefix="cust-link">
          <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
          <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

          <NavDropdown.Item onClick={this.onLogoutClick}>Logout</NavDropdown.Item>
      </NavDropdown>;
      } else {
        authArea =
        <Nav className="ml-auto text-white">
           <Nav.Link className="text-white" ><Link to="/register" className="text-white cust-link">
                  Register
                </Link></Nav.Link>
        <Nav.Link className="text-white" ><Link to="/login" className="text-white cust-link">
                  Login
                </Link></Nav.Link>

      </Nav>
      }
    return (
      <div className="text-white">
      <Navbar >

  <Navbar.Brand> <a className="navbar-brand text-white" href="/"> <img src={logo} className="logo" alt="text"/> <span>Pro-Project Studio</span></a></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav" className="text-white">
    <Nav className="mr-auto text-white">
      <div className="nav-link">
    <a href="#what-is-pro-project-studio" className="text-white cust-link">Why</a>
    </div>
    <div className="nav-link">
    <a href="#what"  className="text-white cust-link">What</a>
    </div>
    <div className="nav-link">
    <a href="#how"  className="text-white cust-link">How</a>
    </div>
    </Nav>
   
    {authArea}
    
  </Navbar.Collapse>
</Navbar>
</div>
    )
}
}


NewNav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NewNav);

