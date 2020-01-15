import React from "react";



// import { PromiseProvider } from "mongoose";

function SongDetail(props) {
  
  return (
      <div className= "song-box" >
      <p>Song Title: {props.songTitle}</p>
      <p>Song Key: {props.songKey}</p>
      <p>Song BPM = {props.bpm}</p>
      </div>
  );
}

export default SongDetail;