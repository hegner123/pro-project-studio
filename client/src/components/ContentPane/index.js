import React from "react";
// import { Link } from "react-router-dom";
import './style.css';
// import bootstrap components
import { Table } from 'react-bootstrap';
import API from "../../utils/API";

function ContentPane(props) {
  return (
    <div className="contentBox">
    {/* <Tab.Content >
      <div > */}

        {/* <Tab.Pane key={props.id} className="contentBox"> */}
          
          <h3>{props.id}</h3>
          {/* <Table>
            <thead>
              <th></th>
              {props.songs.map((song, index) => (
                <th>{song}</th>
              ))}
            </thead>
          </Table> */}



        {/* </Tab.Pane> */}
      {/* </div>
    </Tab.Content> */}
    </div>
  )
}

export default ContentPane;