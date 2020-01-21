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
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ContentPane from 'react-bootstrap/TabContent'
import Table from 'react-bootstrap/Table';
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
    }
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
    state = {
      projects: [],
      idForContent: String,
      projectDetail: [],
      instruments: [],
      songs: [],
      example: [{ title: "1-1", guitar: "false", drum: "true", piano: "true" }, { title: "1-2", guitar: "false", drum: "false", piano: "true"  }]
    };
  



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
        this.setState({ projects: res.data, });
        //console.log(("project array" + JSON.stringify(this.state.projects)));
        this.state.projects.forEach((pobject, index) => {
          //console.log("song object: ", pobject.songs);
          pobject.songs.forEach((song, index) => {
            //console.log("song note: ", song.song_notes[0].noteBody);
          })
        })
        this.setState({ idForContent: this.state.projects[0]._id });
        console.log("id for content on load: " + this.state.idForContent);
        this.loadSongDetails();
      })
      .catch(err => console.log(err));
  };
  generateContent = (id) => {
    this.setState({ idForContent: id })
    console.log("id: " + this.state.idForContent);
    this.loadSongDetails();
  };

  //Get song details for grid
  loadSongDetails = () => {
    API.getProjectDetails(this.state.idForContent)
      .then(res => {
        this.setState({ projectDetail: res.data });
        console.log("project Detail: " + JSON.stringify(this.state.projectDetail));
        const songTemp = [];
        var instTemp = [];
        this.state.projectDetail.songs.forEach((song, index) => {
          songTemp.push(song.song_title);
          song.song_arrangements.forEach((inst, index) => {
            instTemp.push(inst)
          })
        })
        instTemp = new Set(instTemp);
        instTemp = [...instTemp]
        instTemp.sort();
        this.setState({ songs: songTemp, instruments: instTemp });
        console.log("inst: " + this.state.songs)
        //this.renderTableHeader();
      })
      .catch(err => console.log(err));
  };

  renderTableHeader() {
    // let header = this.state.instruments;
    // // console.log(header);
    // // return <th>{this.state.instruments[0]}</th>
    // return header.forEach((inst, index) => {

    // return <th key={index}>{inst}</th>
    // })
    return this.state.instruments.map(inst => {
      return <th>{inst}</th>
    })
  }

  renderTableData() {
    return this.state.example.map((song, index) => {
      const { title, guitar, drum, piano } = song
      return (
        <tr key={title}>
          <td><div>{title}</div></td>
          <td><div>{guitar}</div></td>
          <td><div>{drum}</div></td>
          <td><div>{piano}</div></td>
        </tr>
      )
    })
  }

  render() {
    const { user } = this.props.auth;
    return (
      <Container>
        <Row>
          <Col xs={6}>
            <h1 className="text-white">{user.firstName.split(" ")[0]}</h1>
</Col>
          <div className="dashboard-box">
            <Tab.Container id="list-group-tabs-example" defaultActiveKey={this.state.idForContent}>
              <Row>
                <Col xs={2}>
                  <ListGroup>
                    {this.state.projects.map(project => (
                      <OverlayTrigger placement="right" overlay={
                        <Popover id="popover-basic">
                          <Popover.Title as="h3">{project.title}</Popover.Title>
                          <Popover.Content>
                            <p>Client Name: {project.companyName}</p>
                            <p>Members: {project.members}</p>
                          </Popover.Content>
                        </Popover>} delay={{ show: 250, hide: 300 }}>
                        <ListGroup.Item action
                          href={" #" + project._id}
                          key={project._id} onClick={() => this.generateContent(project._id)}>
                          {project.title}
                        </ListGroup.Item>
                      </OverlayTrigger>
                    ))
                    }
                  </ListGroup>

                <Col sm={8} className="contentSection">
                  <ContentPane
                    id={this.state.idForContent}
                  />
                  <Table>
                    <thead>
                      <tr>
                      <th></th>
                        {this.renderTableHeader()}

                        {/* <th>{this.renderTableHeader()}</th> */}
                        
                        {/* {this.state.instruments.map(inst => (
                          <th>{inst}</th>
                        ))} */}

                      </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>

                  </Table>

                </Col>

            </Col>
            </Row>
            </Tab.Container>

            </div>
            
            </Row>
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


