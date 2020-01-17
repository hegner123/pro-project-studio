import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// import Table from "../../components/Table";
import "./style.css";
import API from "../../utils/API";


// import bootstrap components
import { Row, Tab, Col, ListGroup} from 'react-bootstrap';



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
      <div className="container text-black">
        <div className="row">
          <div className=" col-12">
            <h1 className="text-white">{user.firstName.split(" ")[0]}</h1>
          </div>
          <div className="dashboard-box">
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="{project[0].title}">
              <Row>
                <Col sm={4}>
                  <ListGroup>
                  {this.state.projects.map(project => (
                    <ListGroup.Item action href={" #" + project.title} key={project._id}>
                    {project.title}
                  </ListGroup.Item>
                  ))
                  }
                  </ListGroup>
                </Col>

                <Col sm={8}>
                  <Tab.Content>
                  {this.state.projects.map(project => (
                    
                    <Tab.Pane eventKey={" #" + project.title} key={project._id} className="custom">
                      <p>Client Name: {project.companyName}</p>
                    </Tab.Pane>
                    
                  ))
                  }
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
      </div>
    );
  }
}
// {
//   this.state.projects.map(project => (
//     <ProjectComponent
//       title={project.title}
//       company={project.companyName}
//       key={project._id}
//       id={project._id}
//     />
//   ))
// }





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
