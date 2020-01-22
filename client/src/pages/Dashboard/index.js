import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

// import Table from "../../components/Table";
import "./style.css";
import API from "../../utils/API";

import ContentPane from "../../components/ContentPane";
// import bootstrap components
import { Container, Button, Modal, Row, Tab, Col, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import ReactDataGrid from "react-data-grid";
import { Editors } from "react-data-grid-addons";







export class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    title: "",
    song: [],
    members: [],
    total_arrangements: 0,
    companyName: ""};

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.handleMembersChange = this.handleMembersChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }
  handleCompanyNameChange(event) {
    this.setState({companyName: event.target.value});
  }
  handleMembersChange(event) {
 
    this.setState({members:event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let projectData = {
      title: this.state.title,
      members: this.state.members,
      companyName: this.state.companyName
    }
    console.log(projectData)
    API.saveProject(projectData)
      .then(res => {
        console.log(res);
      })

      .catch(err => console.log(err));
    }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-row">
        <label className="form-label">
          Title:
          <input type="text" className="form-control"onChange={this.handleTitleChange} />
        </label>
        </div>
        <div className ="form-row">
        <label>Members:
        <input type="text" className="form-control" onChange={this.handleMembersChange} />
        </label>
        </div>
        <div className ="form-row">
        <label>Company:
        <input type="text" className="form-control" onChange={this.handleCompanyNameChange} />
        </label>
        </div>

        <input className="btn-primary" type="submit" value="Submit" />
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
      title: String,
      idForContent: String,
      projectDetail: [],
      instruments: [],
      songs: [],
      columns: [],
      rows: [],
      rowCount: Number
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
          this.setState({ title: this.state.projects[0].title });
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
          console.log("project Detail Song: " + JSON.stringify(this.state.projectDetail.songs));
          var instTemp = [];
          var songTemp = [];
          var instStatus = [];
          var status = [];
          this.state.projectDetail.songs.forEach((song, index) => {
            songTemp.push(song.song_title);
            song.song_arrangements.forEach((inst, index) => {
              instTemp.push(inst)
            })
            status.push(song.song_status)
            console.log("status" + JSON.stringify(status));
            // song.song_status.forEach((ins, index) => {
            //   console.log("status" + ins)
            // })
          })
          instTemp = new Set(instTemp);
          instTemp = [...instTemp]
  
          this.renderGrid(instTemp, songTemp, status);
        })
        .catch(err => console.log(err));
    };
  
    renderGrid(inst, songs, status) {
      console.log("inst: " + inst);
  
      const { DropDownEditor } = Editors;
      const issueTypes = [
        { id: "incomplete", value: "Incomplete" },
        { id: "complete", value: "Complete" },
        { id: "x", value: "X" }
      ];
      const IssueTypeEditor = <DropDownEditor options={issueTypes} />;
  
      //Add data to column array
      // First column of song title
      var tempCol = [];
      var columnObj = { key: "songTitle", name: "Song Title" };
      tempCol.push(columnObj);
      // Add remaning columns
      inst.forEach((instrument, index) => {
        columnObj = { key: instrument, name: instrument, editor: IssueTypeEditor }
        tempCol.push(columnObj);
      });
  
      this.setState({ columns: tempCol })
      console.log("add obj: " + JSON.stringify(this.state.columns));
  
      //Add data to row array
      var tempRow = [];
      for (var i = 0; i < songs.length; i++) {
        tempRow.push({})
      }
      tempRow.forEach((row, index) => {
        row.songTitle = songs[index];
        inst.forEach((ins, index) => {
          row[ins] = "X"
        })
        const merged = Object.assign(row, status[index]);
      });
      
      this.setState({ rows: tempRow, rowCount: tempRow.length })
      console.log("num of rows" + this.state.rowCount)
      console.log("row: " + JSON.stringify(this.state.rows));
    }
  
  
    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
      // this.setState(state => {
        const rows = this.state.rows.slice();
        for (let i = fromRow; i <= toRow; i++) {
          rows[i] = { ...rows[i], ...updated };
        }
        return { rows };
      // });
    };
  
    render() {
      const { user } = this.props.auth;
  
      return (
        <div className="container-fluid p-5 text-black">
          <div className="dashboard-bg">
          <div className="row">
            <div className=" col-6">
              <h1 className="text-white">{user.firstName.split(" ")[0]}</h1>
            </div>
            <div className=" col-6">
              <Addproject/>
            </div>
            </div>
            
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
                          </Popover>} delay={{ show: 100, hide: 10 }}>
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
                    {/* <ContentPane
                      id={this.state.title}
                    /> */}
                    <div>
                      <ReactDataGrid
                        columns={this.state.columns}
                        rowGetter={i => this.state.rows[i]}
                        rowsCount={3}
                        onGridRowsUpdated={this.onGridRowsUpdated}
                        enableCellSelect={true}
                      />

                    </div>

                  </Col>
                </Row>
              </Tab.Container>
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
  







