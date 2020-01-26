import React, { Component } from "react";
import { text } from "body-parser";



class Input extends Component {
  state={}
  
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    }

  render(props) {
    return (
      <div>
      {props.items.map(item => (
        // Without the `key`, React will fire a key warning
        <React.Fragment key={item.id}>
         <input type={text} onChange={this.handleOnChange}/>
        </React.Fragment>
      ))}
    </div>
    );
  }
}

export default Input;