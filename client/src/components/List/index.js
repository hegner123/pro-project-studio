import React from "react";
import "./style.css";

// This file exports both the List and ListItem components

export function List({ props }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{props.title}</ul>
    </div>
  );
}

export function ListItem({ props }) {
  // return <li className="list-group-item">{children}</li>;
  return (
    <h3>{props.title}</h3>
  //<p>Written By {props.author}</p>
  );
}
