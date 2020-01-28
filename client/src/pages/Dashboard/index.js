import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import ContentPane from "../../components/ContentPane";
import API from "../../utils/API";
import Note from "../../components/Note";
import Notification from "../../components/Notification";

// import bootstrap components
import { Button, Modal, Row, Tab, Col, ListGroup, OverlayTrigger, Popover, Form, Accordion, Card, Dropdown } from 'react-bootstrap';
import ReactDataGrid from "react-data-grid";
import { Editors } from "react-data-grid-addons";
import "./style.css";

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
        <ProjectForm
        close={handleClose}
        id={props.id}
        refresh={props.refresh()}
        email={props.email}/>

        </Modal.Body>
      </Modal>
    </div>

  )
};
export class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      song: [],
      members: [ this.props.email],
      total_arrangements: 0,
      companyName: "",
      memberForm:""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  addMember(member){
    this.setState(prevState => ({
      members: [...prevState.members, member]
    }));
  }

  

  handleSubmit(e) {
    e.preventDefault();
    let projectData = {
      title: this.state.title,
      members: this.state.members,
      companyName: this.state.companyName
    }
    console.log(projectData)
    API.saveProject(this.props.id,projectData).then(res => {
        this.props.refresh();
        this.props.close();
        console.log(res);
      })
      .catch(err => console.log(err));
  };


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-row">
          <label className="form-label">
            Title:
          <input type="text" className="form-control" name={"title"}
              value={this.state.title}
              onChange={this.handleInputChange} />
          </label>
        </div>
        <div className="members-box">
        <div className="form-row">
        <h6>Accounts with access</h6>
        </div>
       {this.state.members.map(member => (
            <div className="form-row" key={member}>
              <ul>
          <li>{member}<span>X</span></li>
          </ul>
          </div>
                        ))
                        }
                        </div>
                        <div className="form-row">
          <label>Members:
        <input type="email" className="form-control"
        name={"memberForm"}
              value={this.state.memberForm}
              onChange={this.handleInputChange} />
              <Button bsPrefix={"form-butn btn"} onClick={()=> this.addMember(this.state.memberForm) }>Add Members</Button>
          </label>
          </div>
        <div className="form-row">
          <label>Company:
        <input type="text" className="form-control" name={"companyName"}
              value={this.state.companyName}
              onChange={this.handleInputChange} />
          </label>
        </div>
        <button className="form-btn" type="submit" value="Submit">Submit</button>
      </form>
    );
  }
};

export class SongForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songID: "",
      songTitle: "",
      songLyrics: "",
      songKey: "",
      songBpm: "",
      songReferences: [],
      instrumentForm: "",
      instruments: [],
      searchSong: "",
      results: [],
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this)
  }

  searchSong(search) {
    API.spotifyPreview(search).then(res => {
      this.setState({ results: res.data.results });
      console.log(res.data.results)
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    let songStatus = {};
    this.state.instruments.forEach(inst => {
      songStatus[inst] = "\u2717"
    })

    let songData = {
      song_title: this.state.songTitle,
      song_key: this.state.songKey,
      song_bpm: this.state.songBpm,
      song_lyrics: this.state.songLyrics,
      song_references: this.state.songReferences,
      song_arrangements: this.state.instruments,
      song_status: songStatus
    }
    console.log("song data: ", songData);
    API.saveSong(this.props.id, songData)
      .then(res => {
        console.log(res);
        this.props.close()
      })
      .catch(err => console.log(err));

  }

  handleAdd() {
    this.setState(prevState => ({
      instruments: [...prevState.instruments, this.state.instrumentForm.toUpperCase()]
    }));
    console.log(this.state)
    this.setState({ instrumentForm: "" })
  }

  addReference(song) {
    this.setState(prevState => ({
      songReferences: [...prevState.songReferences, song]
    }));
  }



  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-row">
                <label className="form-label">
                  Song Title
          <input type="text" className="form-control" name="songTitle" onChange={this.handleInputChange} />
                </label>
              </div>
              <div className="form-row">
                <label>Song Key
        <input type="text" className="form-control" name="songKey" onChange={this.handleInputChange} />
                </label>
              </div>
              <div className="form-row">
                <label>Song BPM
        <input type="text" className="form-control" name="songBpm" onChange={this.handleInputChange} />
                </label>
              </div>
              <div className="form-row">
                <label>Lyrics
        <textarea type="text" className="form-control" name="songLyrics" onChange={this.handleInputChange} />
                </label>
              </div>
              <div className="form-row">
                <label>Song References
        <input type="text" className="form-control" name="searchSong" onChange={this.handleInputChange} />
                  <Button onClick={() => this.searchSong(this.state.searchSong)}>Search for References</Button>
                  <div>
                    {this.state.results.map(song => (
                      <div key={song}>
                        <p> <a href={song.preview_url} target="_none">{song.name}</a> by {song.artists[0].name}</p>
                        <Button bsPrefix={"sm-btn btn"} onClick={() => this.addReference(song.name)}>Add to References</Button>
                      </div>
                    ))
                    }

                  </div>
                </label>
              </div>

              <div>
                {this.state.instruments.map(instrument => (
                  <div> {instrument}</div>
                ))
                }
                <label>instruments
          <input name={"instrumentForm"} onChange={this.handleInputChange} value={this.state.instrumentForm} />
                </label>
                <Button onClick={() => this.handleAdd()}>Add Instruments</Button>
                {/* <Button  onClick={() => this.saveInstruments()}>saveInstruments Instruments</Button> */}
              </div>
              <Button className="btn-primary" onClick={()=> this.handleSubmit()}>Submit</Button>
            </form>
          </div>
        </div>
      </div>

    );
  }
};

export const AddSong = (props) => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <div className="ml-auto">
      <Button variant="light" onClick={handleShow} className="btn-xs">
        Add Song
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Song</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
          <SongForm id={props.id}
          close={handleClose}
          refresh={props.refresh()}/>
          </div>
        </Modal.Body>

      </Modal>
    </div>

  )
};

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.displayNewNotes = [];

    this.state = {
      projects: [],
      idForContent: String,
      title: String,
      projectDetail: [],
      songsDetails: [],
      instruments: [],
      songs: [],
      columns: [],
      rows: [],
      rowCount: 0,
      songNotes: [],
      songID: "",
      userEmail: "",
      projectMembers: "",
      showNotes: false,
      showNotification: false,
      notificationTitle: "",
      notificationBody: ""
    };

    this.handleNoteChange = this.handleNoteChange.bind(this);
  }

  componentDidMount() {
    console.log("user info: ", this.props.auth.user.email);
    this.setState({ userEmail: this.props.auth.user.email }, () => {
      this.loadProjects();
    })

  };

  loadProjects = () => {
    API.getProjects(this.state.userEmail)
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
    this.setState({ idForContent: id, showNotes: false }, () => {
      //console.log("id: " + this.state.idForContent)
      this.loadSongDetails()
    })
  };

  //Get song details for grid
  loadSongDetails = () => {
    API.getProjectDetails(this.state.idForContent)
      .then(res => {
        this.setState({ projectDetail: res.data });
        //console.log("project Details: " + JSON.stringify(this.state.projectDetail.members.join(", ")));
        let members = "";
        this.state.projectDetail.members.forEach((member, index) => {
          members += member + ", ";
        })

        this.setState({ projectMembers: members })
        //console.log("p members: " , this.state.projectMembers);
        let allSongs = [];

        this.state.projectDetail.songs.forEach((song, index) => {
          allSongs.push(song)
        })

        this.setState({ songsDetails: allSongs }, () => {
          this.renderGrid();
        })
      })
      .catch(err => console.log(err));
  };

  renderGrid = () => {

    const { DropDownEditor } = Editors;
    const issueTypes = [
      { id: "incomplete", value: "\u2717" },
      { id: "complete", value: 	"\u2714" },
    ];
    const IssueTypeEditor = <DropDownEditor options={issueTypes} />;

    //List of all instruments for project
    let inst = [];
    let status = [];
    console.log("all songs: " + JSON.stringify(this.state.songsDetails[0]));
    this.state.songsDetails.forEach((song, index) => {
      song.song_arrangements.forEach((instrument, index) => {
        inst.push(instrument)
      })
      status.push(song.song_status)
    })
    inst = new Set(inst);
    inst = [...inst]

    //Add data to column array
    // First column of song title
    let tempCol = [];
    let columnObj = {
      key: "songTitle", name: "Song Title", resizable: true, events: {
        onClick: (ev, args) => {
          let rowIndex = args.rowIdx;
          this.setState({ songNotes: [] }, () => {
            this.displayNotes(this.state.rows[rowIndex].idx, rowIndex);
            this.setState({ songID: this.state.rows[rowIndex].idx, showNotes: true });
          })

        }
      }
    };

    tempCol.push(columnObj);
    // Add remaning columns
    inst.forEach((instrument, index) => {
      columnObj = { key: instrument, name: instrument, editor: IssueTypeEditor }
      tempCol.push(columnObj);
    });

    this.setState({ columns: tempCol }, () => { })


    //Add data to row array
    var tempRow = [];
    for (var i = 0; i < this.state.songsDetails.length; i++) {
      tempRow.push({})
    }

    tempRow.forEach((row, index) => {
      row.songTitle = this.state.songsDetails[index].song_title;
      row.idx = this.state.songsDetails[index]._id;
      inst.forEach((ins, index) => {
        row[ins] = "N/A"
      })
      Object.assign(row, status[index]);
    });

    this.setState({ rows: tempRow, rowCount: tempRow.length }, () => { });
  };

  displayNotes = (songID, rowIndex) => {
    if (this.state.songsDetails[rowIndex]._id === songID) {
      let noteTempArray = [];
      this.state.songsDetails[rowIndex].song_notes.forEach((note, index) => {
        noteTempArray.push(note)
      });
      this.setState({ songNotes: noteTempArray }, () => {
        console.log("this state song notes", this.state.songNotes)
      });
    }
  };

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    let property = Object.keys(updated)[0];
    const rowsVar = this.state.rows.slice();

    //Only if a cell is applicable, then continute to update the object
    if (!(this.state.rows[fromRow][property] === "N/A")) {
      console.log("it's applicable");

      for (let i = fromRow; i <= toRow; i++) {
        rowsVar[i] = { ...rowsVar[i], ...updated };
      }

      this.setState({ rows: rowsVar }, () => {
        //Once rows in state has been updated, update the object to pass on to the database
        var updatedProjectDetails = this.state.projectDetail;
        updatedProjectDetails.songs[fromRow].song_status[property] = Object.values(updated)[0]

        console.log("updated Project detail", JSON.stringify(updatedProjectDetails));
        this.updateStatus(updatedProjectDetails);
      }
      )
    }
    else {
      console.log("N/A");
    }
  };

  updateStatus = (updatedObj) => {
    let id = this.state.idForContent;
    console.log("inside update status func ", updatedObj)
    API.updateProject(id, updatedObj)
      .then(res => {
        console.log("successfully status updated");
      })
      .catch(err => console.log(err));
  };

  handleNoteChange = (event) => {
    let tempArray = this.state.songNotes;
    const target = event.target;
    const index = tempArray.findIndex(x => x._id === target.id);
    const value = target.value;
    const name = target.name;

    tempArray[index].noteBody = value;

    this.setState({
      [name]: tempArray
    }, () => {
      //console.log("updated song notes value: ", this.state.songNotes)
    });
  };

  handleNoteTitleChange = (event) => {
    let tempArray = this.state.songNotes;
    const target = event.target;
    const index = tempArray.findIndex(x => x._id === target.id);
    const value = target.value;
    const name = target.name;

    tempArray[index].noteTitle = value;

    this.setState({
      [name]: tempArray
    }, () => {
      //console.log("updated song notes value: ", this.state.songNotes)
    });
  };

  saveNotes = () => {

    //Update the project variable with song notes
    let updatedProjectDetails = this.state.projectDetail;
    let songIndex;
    let id;
    updatedProjectDetails.songs.forEach((song, index) => {
      if (song._id === this.state.songID) {
        //console.log("found matching song ID", index);
        song.song_notes = this.state.songNotes;
        songIndex = index;
        id = song._id;
      }
    })

    API.updateProject(this.state.idForContent, updatedProjectDetails)
      .then(res => {
        console.log("successfully status updated");
        this.displayNotes(this.state.songID, songIndex);
        this.setState({ songID: id, showNotification: true, notificationTitle: "Notes successfully updated!" });

      })
      .catch(err => console.log(err));

  };

  addNewNote = () => {
    let songIndex = this.findSongIndex();
    // let id = this.state.songID;
    var dataObj = {
      newNote: { newNote: '{_id: new ObjectId(), noteStatus: "N/A", noteTitle: "Note Title", noteBody: "Note Body"}' },
      index: songIndex
    }
    API.addNote(this.state.idForContent, dataObj)
      .then(res => {
        console.log("successfully added new note", res);
      })
      .catch(err => console.log(err));
  };


  refreshNotes = () => {
    this.renderGrid();
    this.forceUpdate();
    
  }

  removeNote = (id) => {
    let songIndex = this.findSongIndex();
    console.log("remove note button click");

    var dataObj = {
      id: id,
      index: songIndex
    }
    API.removeNote(this.state.idForContent, dataObj)
      .then(res => {
        console.log("successfully removed a note", res);
        this.loadProjects();
        this.setState({ showNotification: true, notificationTitle: "Note Deleted!", notificationBody: "Please refresh the page" });
      })
      .catch(err => console.log(err));
  };

  findSongIndex = () => {
    var songIndex;

    this.state.projectDetail.songs.forEach((song, index) => {
      if (song._id === this.state.songID) {
        console.log("found matching song ID index", index);
        songIndex = index;
      }
    })
    return (songIndex);
  };

  deleteProject = (id) => {
    API.deleteProject(id)
      .then(res => this.loadProjects());
  };
  hideNotification = () => {
    this.setState({ showNotification: false, notificationTitle: "", notificationBody: ""})
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div className="container-fluid p-5 text-black">
        <div className="dashboard-bg">
          <div className="row">
            <div className="col-6">
              <h1 className="text-white">{user.firstName.split(" ")[0]}</h1>
            </div>
            <div className="col-6 btn-align">
              <div className="cust-btn-group">
                <Addproject id={this.state.idForContent}
                refresh={()=> this.loadProjects}
                email={this.props.auth.user.email}/>
                <AddSong id={this.state.idForContent}
                refresh={()=> this.loadProjects} />
              </div>
            </div>
          </div>
          {this.state.showNotification ? (
            <Notification 
              title = {this.state.notificationTitle}
              body = {this.state.notificationBody}
              show = {this.state.showNotification}
              onHide = {this.hideNotification}
            />
          ) : (null)}

          {this.state.projects.length ? (
            <Tab.Container id="list-group-tabs-example" defaultActiveKey={this.state.idForContent}>
              <Row>
                <Col xs={12} md={2}>
                  <ListGroup>
                    {this.state.projects.map(project => (
                      <OverlayTrigger placement="top" key={project.id} overlay={
                        <Popover id="popover-basic">
                          <Popover.Title as="h3">{project.title}</Popover.Title>
                          <Popover.Content>
                            <p>Client Name: {project.companyName}</p>
                            <p>Members: {this.state.projectMembers}</p>
                          </Popover.Content>
                        </Popover>} >
                        <ListGroup.Item action
                          href={" #" + project._id}
                          key={project._id}
                          onClick={() => this.generateContent(project._id)}
                        >

                          <div className="row">
                            <div className="col-6">
                              {project.title}
                            </div>
                            <div className="col-6 btn-align">

                              <Dropdown bsPrefix={"myparentDropdown"}>
                                <Dropdown.Toggle bsPrefix={"myDropdown"} id="dropdown-basic">
                                  ...
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={() => this.editProject(project._id)}>Edit Project</Dropdown.Item>
                                  <Dropdown.Item onClick={() => this.deleteProject(project._id)}>Delete Project</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </ListGroup.Item>
                      </OverlayTrigger>
                    ))
                    }
                  </ListGroup>
                </Col>

                <Col xs={12} sm={8} className="content-section">
                  <ContentPane
                    id={this.state.title}
                  />
                  <div>
                    <ReactDataGrid
                      columns={this.state.columns}
                      rowGetter={i => this.state.rows[i]}
                      rowsCount={this.state.rowCount}
                      onGridRowsUpdated={this.onGridRowsUpdated}
                      enableCellSelect={true}
                     
                    />
                  </div>

                  <div className="moreDetailsDiv">
                    <Accordion>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            More Details!
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <h3>Client Name: {this.state.projectDetail.companyName}</h3>
                            <h3>Member: {this.state.projectMembers}</h3>
                            {this.state.projectDetail.songs && this.state.projectDetail.songs.map((song, index) => (
                              <div>
                                <h5>{song.song_title}</h5>
                                <p>Song Key: {song.song_key}</p>
                                <p>Song BPM: {song.song_bpm}</p>
                              </div>
                            ))}

                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                </Col>
                <Col sm={2} className="notesSection">
                  <div>
                    <h3>Notes Section</h3>
                    {/* {this.displayNewNotes} */}
                    {this.state.showNotes ? (
                      <div>
                        <Button id="saveNotesButton" className="noteComponents" variant="outline-primary" onClick={() => this.addNewNote()}>New Note</Button>
                        <Button id="saveNotesButton" className="noteComponents" variant="outline-primary" onClick={() => this.saveNotes()}>Save All Notes</Button>
                        <Form.Group id="formGroup" className="noteComponents">
                          {this.state.songNotes && this.state.songNotes.map((note, index) => (
                            <Note
                              key={index}
                              noteId={note._id}
                              titleValue={this.state.songNotes[index].noteTitle}
                              titleOnChange={this.handleNoteTitleChange}
                              name={"songNotes"}
                              bodyValue={this.state.songNotes[index].noteBody}
                              bodyOnChange={this.handleNoteChange}
                              removeNote={this.removeNote}
                            />
                          ))}
                        </Form.Group>
                      </div>

                    ) : (null)}

                  </div>
                </Col>
              </Row>
            </Tab.Container>
          ) : (
              <h3 className="text-white">We couldn't find any Projects. Click Add Project to get Started.</h3>
            )}

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








