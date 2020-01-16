import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// import Table from "../../components/Table";
import "./style.css";
import API from "../../utils/API";
import ProjectComponent from "../../components/ProjectComponent";


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
        // console.log(("project array" + JSON.stringify(this.state.projects)));
      })

      .catch(err => console.log(err));
  };



  render() {
    const { user } = this.props.auth;

    return (
      <div className="container text-white">
        <div className="row">
          <div className=" col-12">
            <h1 className="text-white">{user.firstName.split(" ")[0]}</h1>
          </div>
          
          {/* <h3>Projects</h3> */}
          <div className="">
           {this.state.projects.map(project => (
             <ProjectComponent
               title={project.title}
               company = {project.companyName}
               key={project._id}
               id = {project._id}
             />

           )) }

          
          
        
            </div>
            
        </div>
        <button
              onClick={this.onLogoutClick}
              className="btn btn-dark bg-dark mt-5"
            >
              Logout
            </button>
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
