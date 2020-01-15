import React, { Component } from "react";


class Logout extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    return (

      <button
      onClick={this.onLogoutClick}
      className="btn btn-dark bg-dark mt-5"
    >
      Logout
    </button>
    );
  }
}

export default Logout;
