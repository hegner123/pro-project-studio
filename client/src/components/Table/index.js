import React, { Component } from "react";
import HeatMap from "react-heatmap-grid";

  class Table extends Component{
    state={
      data: ["song1", "song2", "song3"]
    }

  

  render(props) {
    const xLabels = this.state.data;

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