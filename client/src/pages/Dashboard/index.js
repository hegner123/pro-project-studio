import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// import Table from "../../components/Table";
import "./style.css";
import API from "../../utils/API";
// import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

// import bootstrap components
import Row from "react-bootstrap/Row"
import Tab from "react-bootstrap/Tab"
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
// import Form from 'react-bootstrap/Form'
import Modal from "react-bootstrap/Modal"


export class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: "",
    song: [],
    members: [],
    total_arrangements: 0,
    companyName: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  handleChange(event) {
    this.setState({title: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let projectData = {
      title: this.state.title,
      companyName: this.state.companyName
    }
    API.saveProject(projectData)
      .then(res => {
        console.log(res);
      })

      .catch(err => console.log(err));
  };


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" onChange={this.handleChange} />
        </label>

        <input type="submit" value="Submit" />
      </form>
    );
  }
};

export const Addproject = (props) => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <div className="ml-auto">
      <Button variant="light" onClick={handleShow} className="btn-xs">
        Add Project
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NameForm/>

        </Modal.Body>

      </Modal>
      </div>

  )
  }




class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state= {
      projects: [],
      success: false
    };
}
  



  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    this.loadProjects();
  };

  loadProjects = () => {
    API.getProjects()
      .then(res => {
        this.setState({ projects: res.data });

      })

      .catch(err => console.log(err));
  };

  


  render() {
    const { user } = this.props.auth;
    return (
      <Container>
        <Row>
          <Col xs={6}>
            <h1 className="text-white">{user.firstName.split(" ")[0]}</h1>
            </Col>
            <Col xs={6}>
            <Addproject/>
            </Col>
          </Row>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="{project[0].title}">
              <Row>
                <Col xs={2}>
                  <ListGroup>
                  {this.state.projects.map(project => (
                    <ListGroup.Item href={" #" + project.title} key={project._id} onClick={(e) => console.log(project._id)}>
                    {project.title}
                  </ListGroup.Item>
                  ))
                  }
                  </ListGroup>

                </Col>
                <Col xs={8}>
                  <Tab.Content>
                  {this.state.projects.map(project => (
                    <Tab.Pane eventKey={" #" + project.title} key={project._id} >
                      <p className="text-white">Client Name: {project.companyName}</p>
                      <p className="text-white">Members: {project.members}</p>
                    </Tab.Pane>
                  ))
                  }
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>

        </Container>
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


