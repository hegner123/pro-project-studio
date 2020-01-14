import React, { Component } from "react";
import "./style.css";
import Image from "./images/Image1.svg"


class Landing extends Component {
  render() {
    return (
     <div className="container-fluid full">
       <div className="row">

         <div className="col-6 d-flex ">
           <div className="header">
             <h1 className="text-white">Pro-Project Studio</h1>
             <h3 className="text-white">Make it easy for you and your clients 
to keep track of your recording projects.</h3>
           </div>
         </div>

         <div className="col-6 d-flex">
           <img src= {Image} alt="logo" className="landing-page-img" />
         </div>

       </div>

     </div>
    );
  }
}

export default Landing;
