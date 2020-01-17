import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// import Table from "../../components/Table";
import "./style.css";
import API from "../../utils/API";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

// import bootstrap components
import Row from "react-bootstrap/Row"
import Tab from "react-bootstrap/Tab"
import ListGroup from 'react-bootstrap/ListGroup';
// import Form from 'react-bootstrap/Form'
// import Modal from 'react-bootstrap/Modal'


class Dashboard extends Component {
  state = {
    projects: [],
    success: false
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
    // const [show, setShow] = useState(false);
    const { user } = this.props.auth;
    

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
      <Container>
        <Row>
          <Col xs={6}>
            <h1 className="text-white">{user.firstName.split(" ")[0]}</h1>
            </Col>
          <Col xs={6} >
          <Button >Filter</Button>

          <Button type="submit">Button</Button>
          </Col>

          </Row>
          
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="{project[0].title}">
              <Row>
                <Col xs={2}>
                  <ListGroup>
                  {this.state.projects.map(project => (
                    <ListGroup.Item action href={" #" + project.title} key={project._id}>
                    {project.title}
                  </ListGroup.Item>
                  ))
                  }
                  </ListGroup>
                </Col>

                <Col xs={5}>
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

            {/* <Form> */}
  {/* <Form.Group controlId="project-name">
    <Form.Label>Project Name</Form.Label>
    <Form.Control type="text" placeholder="Project Name" />
  </Form.Group>

  <Form.Group controlId="project-songs">
    <Form.Label>songs</Form.Label>
    <Form.Control type="text" placeholder="Songs" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
<Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
        </Container>
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
