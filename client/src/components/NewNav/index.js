import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import logo from "./Group2.png";
import { Link } from "react-router-dom";

class NewNav extends Component {



    onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutUser();
    };
   
  
    render() {
      const { user } = this.props.auth;
      const isLoggedIn = localStorage.jwtToken;
      let button;

      if (isLoggedIn) {
        button =
        <NavDropdown title={user.firstName} id="basic-nav-dropdown">
          <NavDropdown.Item> <Link to="/dashboard" className="nav-link">Dashboard </Link></NavDropdown.Item>
          <NavDropdown.Item> <Link to="/profile" className="nav-link">Profile </Link></NavDropdown.Item>

          <NavDropdown.Item> <Link to="/profile" onClick={this.onLogoutClick} className="nav-link">Logout </Link></NavDropdown.Item>
      </NavDropdown>;
      } else {
        button =
        <Nav className="ml-auto text-white">
           <Nav.Link className="text-white" ><Link to="/register" className="nav-link text-white">
                  Register
                </Link></Nav.Link>
        <Nav.Link className="text-white" ><Link to="/login" className="nav-link text-white">
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
      <Link to="/why">Why</Link>
    </Nav>
    {button}
    
  </Navbar.Collapse>
</Navbar>
</div>
    )
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
)(NewNav);

