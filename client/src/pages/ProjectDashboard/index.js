import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./style.css";
import API from "../../utils/API";
import ProjectDetail from "../../components/ProjectDetails";


class ProjectDashboard extends Component {
  state = {
    project: []
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    API.getProject(this.props.match.params.id)
      .then(res => 
        {
          this.setState({ project: res.data });
          console.log("project details array" + JSON.stringify(this.state.project));
        }
      )
      .catch(err => console.log(err));
  }



  // loadProjects = () => {
  //   API.getProjects()
  //     .then(res => {
  //       this.setState({ projects: res.data });
  //       console.log(("project array" + JSON.stringify(this.state.projects)));
  //       console.log(("project array first item" + this.state.projects[0].title));
  //     })

  //     .catch(err => console.log(err));
  // };


  render() {

    return (
      <div className="container text-white">
        <div className="row">

          <ProjectDetail
           members = {this.state.project.members}
           projectTitle = {this.state.project.title}/>
          </div>
        </div>

    );
  }
}

ProjectDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(ProjectDashboard);
