import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./css/style.css";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="container text-white">
        <div className="row">
          <div className="dashboard-header col-12">
    <h1>{user.firstName.split(" ")[0]}</h1>
          </div>
          <div className="dashboard-box">
          <div className="col-12 text-center m-auto">

            <button
              onClick={this.onLogoutClick}
              className="btn btn-dark bg-dark mt-5"
            >
              Logout
            </button>
          </div>
          </div>
        </div>
      </div>
    ); 
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
