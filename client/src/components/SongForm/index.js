import React from "react";

// import Table from "../../components/Table";
import API from "../../utils/API";


// import bootstrap components
import { Button, Modal } from 'react-bootstrap';
import "./style.css"



export class SongForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    songTitle:"",
    songArrangements:[],
    songLyrics:"",
    songKey:"",
    songBpm:""
    }



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


  handleSubmit(e) {
    e.preventDefault();
    let songData = {
      song_title: this.state.songTitle,

    }
    console.log(songData)
    API.saveSong(songData, this.props.id)
      .then(res => {
        console.log(res);
      })

      .catch(err => console.log(err));
    }


  render() {

    return (
      <div className="wide">
      <form onSubmit={this.handleSubmit}>
        <div className="form-row">
        <label className="form-label">
          Song Title
          <input type="text" className="form-control" name="songTitle"onChange={this.handleInputChange} />
        </label>
        </div>
        <div className ="form-row">
        <label>Instruments <span className="btn" onClick={()=>this.handleAddInput}>+</span> <span className="btn" onClick={()=>this.handleDeleteInput}>-</span>
        <input type="text" className="form-control" onChange={this.handleInputChange} />
        </label>
        <div id="form-section"></div>
        </div>

        <div className ="form-row">
        <label>Key
        <input type="text" className="form-control" onChange={this.handleInputChange} />
        </label>
        </div>
        <div className ="form-row">
        <label>Song Lyrics
        <textarea type="text" className="form-control" onChange={this.handleInputChange} />
        </label>
        </div>




        <input className="btn-primary" type="submit" value="Submit" />
      </form>
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
          <SongForm id={props.id}/>

        </Modal.Body>

      </Modal>
      </div>

  )
  };

  