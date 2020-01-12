import React from "react";
import "./style.css";

function SearchResults(props) {
  return (
    <div className="resultBox">
      <h3>{props.title}</h3>
      <a href={props.link} target="_blank"><button>View</button></a>
      
      <button onClick={()=> props.handleSave({
              title: "title",
              author: "author",
              summary: "summary",
              image: "image",
              link: "link"
      })}>Save</button>
      <p>Written By {props.author}</p>
      <img alt={props.title} src={props.img}/>
      <p className="summary">{props.summary}</p>
    </div>
  );
}

export default SearchResults;
