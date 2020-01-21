import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
// import Table from "../../components/Table";
import "./style.css";
import API from "../../utils/API";
import ContentPane from "../../components/ContentPane";
// import bootstrap components
import { Row, Tab, Col, ListGroup, OverlayTrigger, Popover, Table, Dropdown, DropdownButton } from 'react-bootstrap';


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
  }

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

          <td><div>{drum}</div></td>
          <td><div>{piano}</div></td>
        </tr>
      )
    })
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div className="container text-black">
        <div className="row">
          <div className=" col-12">
            <h1 className="text-white">{user.firstName.split(" ")[0]}</h1>
          </div>
          <div className="">
            <Tab.Container id="list-group-tabs-example" defaultActiveKey={this.state.idForContent}>
              <Row>
                <Col sm={4}>
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
                </Col>

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
