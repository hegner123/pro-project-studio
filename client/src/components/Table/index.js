import React, { Component } from "react";
import HeatMap from "react-heatmap-grid";

  class Table extends Component{

  

  render() {
    const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);

    // Display only even labels
    const xLabelsVisibility = new Array(24)
      .fill(0)
      .map((_, i) => (i % 2 === 0 ? true : false));
    
    const yLabels = ["Sun", "Mon", "Tue"];
    const data = new Array(yLabels.length)
      .fill(0)
      .map(() =>
        new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
      );
      
      function test(){
        alert('test')
      }

    return (
      <div>
<HeatMap
   xLabels={xLabels}
   yLabels={yLabels}
   xLabelsLocation={"bottom"}
   xLabelsVisibility={xLabelsVisibility}
   xLabelWidth={50}
   data={data}
   squares
   onClick={(x, y) => test()}
   cellStyle={(background, value, min, max, data, x, y) => ({
     background: `rgb(66, 86, 244, ${1 - (max - value) / (max - min)})`,
     fontSize: "11px",
   })}
   cellRender={value => value && `${value}%`}
  />
      </div>
      
    )}

    }

    export default Table;