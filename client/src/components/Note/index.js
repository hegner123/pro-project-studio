import React from "react";
// import { Link } from "react-router-dom";
import './style.css';
// import bootstrap components
import { Form } from 'react-bootstrap';
//import API from "../../utils/API";

function Note(props) {
  return (
    <div key={props.index} className="noteDiv">
    
    <Form.Control type="text" 
      id={props.noteId}
      value={props.titleValue}
      onChange={props.titleOnChange}
      name={props.name} />

    <Form.Control as="textarea" rows="3"
      id={props.noteId}
      value={props.bodyValue}
      onChange={props.bodyOnChange}
      name={props.name} />
    <span className="removeNote" value={props.noteId} onClick={() => props.removeNote(props.noteId)}>𝘅</span>
  </div>
  )
}

export default Note;