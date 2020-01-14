import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import API from "../../utils/API";
import ProjectComponent from "./ProjectComponent";

class Dashboard extends Component {

  state = {
    projects: []
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    this.loadProjects();
  }

  loadProjects = () => {
    API.getProjects()
      .then(res => {
        this.setState({ projects: res.data });
        console.log(("project array" + JSON.stringify(this.state.projects)));
        console.log(("project array first item" + this.state.projects[0].title));
      })

      .catch(err => console.log(err));
  };


  render() {
    const { user } = this.props.auth;

    return (
      <div className="container text-white">
        <div className="row">
          <div className=" mx-auto mt-5 col-12 col-md-6 text-center">
            <h4>
              <b>Hey there,</b> {user.firstName.split(" ")[0]}
              
            </h4>
            <button
              onClick={this.onLogoutClick}
              className="btn bg-light mt-5"
            >
              Logout
            </button>
          </div>
        </div>

        <h3>Projects</h3>
           
           {this.state.projects.map(project => (
             <ProjectComponent
               title={project.title}
             />
           
           )) }      

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
