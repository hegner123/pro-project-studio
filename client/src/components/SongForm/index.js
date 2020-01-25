import React, { Component } from "react";

// import Table from "../../components/Table";
import API from "../../utils/API";


// import bootstrap components
import { Button, Modal } from 'react-bootstrap';
import "./style.css"




export class SongForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    songTitle:"",
    songLyrics:"",
    songKey:"",
    songBpm:"",
    songReferences:""
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
      song_key: this.state.songKey,
      song_bpm: this.state.songBpm,
      song_lyrics: this.state.songLyrics,
      song_references:this.state.songReferences

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
      <div className="container">
        <div className="row">
        <div className="col-6">
      <form onSubmit={this.handleSubmit}>
        <div className="form-row">
        <label className="form-label">
          Song Title
          <input type="text" className="form-control" name="songTitle" onChange={this.handleInputChange} />
        </label>
        </div>
        <div className ="form-row">
        <label>Song Key
        <input type="text" className="form-control" name="songKey" onChange={this.handleInputChange} />
        </label>
        </div>
        <div className ="form-row">
        <label>Song BPM
        <input type="text" className="form-control" name="songBpm" onChange={this.handleInputChange} />
        </label>
        </div>
        <div className ="form-row">
        <label>Lyrics
        <textarea type="text" className="form-control" name="songLyrics" onChange={this.handleInputChange} />
        </label>
        </div>
        <div className ="form-row">
        <label>Song References
        <input type="text" className="form-control" name="songReferences" onChange={this.handleInputChange} />
        </label>
        </div>


        <input className="btn-primary" type="submit" value="Submit" />
      </form>
      </div>
      <div className="col-6">
        <AddInstrument/>
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
          <SongForm id={props.id}/>
        </Modal.Body>

      </Modal>
      </div>

  )
  };

  

  export class AddInstrument extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      instruments:[],
      instrumentForm:""

      }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.saveInstruments = this.saveInstruments.bind(this);
      this.handleAdd = this.handleAdd.bind(this)
  
    }
   
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
      console.log(this.state)
      console.log(this.state.instrumentForm)
      }

  handleAdd(e) {
      this.setState(prevState => ({
        instruments: [...prevState.instruments, this.state.instrumentForm]
      }));
      console.log(this.state)
      this.setState({instrumentForm :""})
      //console.log(("project array" + JSON.stringify(this.state.projects)));
    }


  saveInstruments(e) {
    
    let instrumentData = this.state.instruments
    console.log(instrumentData)
    API.saveInstruments(instrumentData, this.props.id)
      .then(res => {
        console.log(res);
      })

      .catch(err => console.log(err));
    console.log(this.state)
    }


  render(props) {

    return (

      <div className="border">
         {this.state.instruments.map(instrument => (
           <div> {instrument}</div>
                      ))
                      }
      <form>
      <label>instruments
        <input name={"instrumentForm"} onChange={this.handleInputChange} value={this.state.instrumentForm}/>
      </label>
      <Button  onClick={() => this.handleAdd()}>Add Instruments</Button>
      </form>
      <Button className="btn-primary" onClick={() => this.saveInstruments()}>Save Instruments</Button>
      </div>
    )
  }
  }