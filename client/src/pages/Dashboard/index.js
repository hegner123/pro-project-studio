import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
// import Table from "../../components/Table";
import "./style.css";
import API from "../../utils/API";
import ContentPane from "../../components/ContentPane";
// import bootstrap components
import { Row, Tab, Col, ListGroup, OverlayTrigger, Popover, Form, Button} from 'react-bootstrap';
import ReactDataGrid from "react-data-grid";
import { Editors } from "react-data-grid-addons";

class Dashboard extends Component {
  constructor(props) {
    super(props)
    
    this.displayNewNotes = [];

    this.state = {
      projects: [],
      idForContent: String,
      projectDetail: [],
      songsDetails: [],
      instruments: [],
      songs: [],
      columns: [],
      rows: [],
      rowCount: 0,
      songNotes: [],
      songID: "",
      //displayNewNotes: [],
      showNewNotes: this.displayNewNotes
    };

    this.handleNoteChange = this.handleNoteChange.bind(this);
    //this.addNewNote = this.addNewNote.bind(this);
  }



  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    console.log("user info: ", this.props.auth);
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
        //console.log("id for content on load: " + this.state.idForContent);
        //console.log("view note icon:  " + JSON.stringify(this.state.viewNoteAction))
        this.loadSongDetails();
      })
      .catch(err => console.log(err));
  };
  generateContent = (id) => {
    this.setState({ idForContent: id }, () => {
      //console.log("id: " + this.state.idForContent)
      this.loadSongDetails()
    }
    )
  };

  //Get song details for grid
  loadSongDetails = () => {
    API.getProjectDetails(this.state.idForContent)
      .then(res => {
        this.setState({ projectDetail: res.data });
        //console.log("project Detail Song: " + JSON.stringify(this.state.projectDetail.songs));
        let allSongs = [];

        this.state.projectDetail.songs.forEach((song, index) => {
          allSongs.push(song)
        })

        this.setState({ songsDetails: allSongs }, () => {
          this.renderGrid();
        }
        )
      })
      .catch(err => console.log(err));
  };

  renderGrid = () => {

    const { DropDownEditor } = Editors;
    const issueTypes = [
      { id: "incomplete", value: "Incomplete" },
      { id: "complete", value: "Complete" },
      //{ id: "na", value: "N/A" }
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

    console.log("status: " + JSON.stringify(status));

    //Add data to column array
    // First column of song title
    var tempCol = [];
    var columnObj = {
      key: "songTitle", name: "Song Title", resizable: true, events: {
        onDoubleClick: (ev, args) => {
          let rowIndex = args.rowIdx;
          this.displayNotes(this.state.rows[rowIndex].idx, rowIndex);
          console.log(
            "song Id? ", this.state.rows[rowIndex].idx
          );
          this.setState({ songID: this.state.rows[rowIndex].idx });
          //console.log(this.state.rows[index].idx)
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
      const merged = Object.assign(row, status[index]);
    });

    this.setState({ rows: tempRow, rowCount: tempRow.length }, () => { });
  }

  displayNotes = (songID, rowIndex) => {
    //console.log("songid: ", songID);
    if (this.state.songsDetails[rowIndex]._id === songID) {
      //console.log("found matching song id", this.state.songsDetails[rowIndex].song_title);
      let noteTempArray = [];
      this.state.songsDetails[rowIndex].song_notes.forEach((note, index) => {
        noteTempArray.push(note)
      });
      this.setState({ songNotes: noteTempArray }, () => {
        console.log("this state song notes", this.state.songNotes)
      });

    }

  }

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

  }

  checkCellEditable = ({ column, row }) => {
    //console.log("editable function", row)
    // if (row.id === 1) {

    // }
    return (false)
  }
  rowSelected = (index) => {
    // console.log("cell clicked is read");
    //console.log("row info " + row.songTitle)
    console.log(this.state.rows[index].idx)
    // if ()
  }
  // getCellActions = (column, row) => {
  //   //console.log("column info " + JSON.stringify(row))
  //   //console.log("view note icon:  " + JSON.stringify(this.state.viewNoteAction))
  //   const cellActions = {
  //     songTitle: this.state.viewNoteAction
  //   };
  //   //console.log("row id" + row.songTitle)
  //   return row.songTitle ? cellActions[column.key] : cellActions[column.key];
  // }
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
    updatedProjectDetails.songs.forEach((song, index) => {
      if (song._id === this.state.songID) {
        //console.log("found matching song ID", index);
        song.song_notes = this.state.songNotes;
      }
    })

    API.updateProject(this.state.idForContent, updatedProjectDetails)
      .then(res => {
        console.log("successfully status updated");
      })
      .catch(err => console.log(err));

  }

  addNewNote = () => {
    //Add new note object
    // let updatedProjectDetails = this.state.projectDetail;
    // updatedProjectDetails.songs.forEach((song, index) => {
    //   if (song._id === this.state.songID) {
    //     //console.log("found matching song ID", index);
    //     var tempArray = this.state.songNotes;
    //     tempArray.push({"_id": new ObjectId(), "noteTitle": "Note Title", "noteBody": "Note Body"});
    //     console.log("array: ", tempArray)
    //     song.song_notes = tempArray;
    //   }
    // })

    // API.updateProject(this.state.idForContent, updatedProjectDetails)
    //   .then(res => {
    //     console.log("successfully added new note");
    //   })
    //   .catch(err => console.log(err));

    let songIndex;

    this.state.projectDetail.songs.forEach((song, index) => {
      if (song._id === this.state.songID) {
        console.log("found matching song ID index", index);
        songIndex = index;
       //song.song_notes = this.state.songNotes;
      }
    })
    
    // var newNoteObj = {
    //   "_id": "new ObjectId()", 
    //   "noteTitle": "Note Title", 
    //   "noteBody": "Note Body"
    // };
   
    let noteObj = '{$push: {"songs.' + songIndex + '.song_notes": {_id: new ObjectId(), "noteStatus": "N/A", noteTitle": "Note Title", "noteBody": "Note Body"}}}'
    console.log("stringformat: " + noteObj);
    var newnoteObj = '{_id: new ObjectId(), noteStatus: "N/A", noteTitle: "Note Title", noteBody: "Note Body"}'
    var dataObj = {
      newNote: {newNote: '{_id: new ObjectId(), noteStatus: "N/A", noteTitle: "Note Title", noteBody: "Note Body"}'},
      index: songIndex
    }
    API.addNote(this.state.idForContent, dataObj)
    .then(res => {
      console.log("successfully added new note", res);
      this.loadProjects();
    })
    .catch(err => console.log(err));

    // this.displayNewNotes.push(<Form.Control as="textarea" rows="3"/>);
    // this.setState({
    //    showNewNotes : this.displayNewNotes,
    //    //displayNewNotes: tempArray
    //   //  postVal : ""
    // });

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
                <Col sm={2}>
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

                    {/* short circuit (conditional rendering){this.state.songNotes && <SongNotes/>} */}
                  </ListGroup>
                </Col>

                <Col sm={8} className="contentSection">
                  <ContentPane
                    id={this.state.idForContent}
                  />
                  <div>
                    <ReactDataGrid
                      columns={this.state.columns}
                      rowGetter={i => this.state.rows[i]}
                      rowsCount={this.state.rowCount}
                      onCheckCellIsEditable={this.state.checkCellEditable}
                      onGridRowsUpdated={this.onGridRowsUpdated}
                      //onRowClick={this.rowSelected}
                      enableCellSelect={true}
                    // getCellActions={this.getCellActions}
                    />

                  </div>

                </Col>
                <Col sm={2} className="notesSection">
                  <div>
                    <h3>Notes Section</h3>
                    <Button id="saveNotesButton" variant="outline-primary" onClick={() => this.addNewNote()}>New Note</Button>
                    <Form.Group controlId="exampleForm.ControlTextarea1" id="formGroup">
                      {this.state.songNotes && this.state.songNotes.map((note, index) => (
                        <div key={index}>
                          {/* <Form.Label key={index}>{note.noteTitle}</Form.Label> */}
                          <Form.Control type="text" 
                            id={note._id}
                            value={this.state.songNotes[index].noteTitle}
                            onChange={this.handleNoteTitleChange}
                            name={"songNotes"} />

                          <Form.Control as="textarea" rows="3"
                            id={note._id}
                            value={this.state.songNotes[index].noteBody}
                            onChange={this.handleNoteChange}
                            name={"songNotes"} />
                        </div>
                      ))}
                      <div id="display-data-Container">
                        {this.displayNewNotes}
                      </div>
                      <Button id="saveNotesButton" variant="outline-primary" onClick={this.saveNotes}>Save All Notes</Button>
                    </Form.Group>
                  </div>
                </Col>
              </Row>
            </Tab.Container>
          </div>
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
