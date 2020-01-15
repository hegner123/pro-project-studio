import React, { Component } from "react";
import HeatMap from "react-heatmap-grid";

function Table (props) {
    // const xLabels = {props.songList};

    // Display only even labels
    // const xLabelsVisibility = new Array(24)
    //   .fill(0)
    //   .map((_, i) => (i % 2 === 0 ? true : false));
    
    // //const yLabels = {props.arragement};
    // const data = new Array({props.arragement}.length)
    //   .fill(0)
    //   .map(() =>
    //     new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
    //   );
    console.log("props.data" + props.data)
    
      return (
        <div style={{ fontSize: "13px" }}>
          <HeatMap
            xLabels={props.songList}
            yLabels={props.arrangement}
            // xLabels={['test1', 'test2']}
            // yLabels={['test3', 'test4']}
            // data={[[1, 2], [3, 4]]}
            xLabelsLocation={"bottom"}
            //xLabelsVisibility={xLabelsVisibility}
            xLabelWidth={60}
            data={new Array(props.arrangement.length)
              .fill(0)
              .map(() => new Array(props.songList.length).fill(0).map(() => Math.floor(Math.random() * 100)))
            }
            squares
            //onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
            cellStyle={(background, value, min, max, data, x, y) => ({
              background: `rgb(0, 151, 230, ${1 - (max - value) / (max - min)})`,
              fontSize: "11.5px",
              color: "#000"
            })}
            cellRender={value => value && `${value}%`}
          />
        </div>
      );
    
  

//   render() {
//     const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);

//     // Display only even labels
//     const xLabelsVisibility = new Array(24)
//       .fill(0)
//       .map((_, i) => (i % 2 === 0 ? true : false));
    
//     const yLabels = ["Sun", "Mon", "Tue"];
//     const data = new Array(yLabels.length)
//       .fill(0)
//       .map(() =>
//         new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
//       );
      
//       function test(){
//         alert('test')
//       }

//     return (
//       <div>
// <HeatMap
//    xLabels={xLabels}
//    yLabels={yLabels}
//    xLabelsLocation={"bottom"}
//    xLabelsVisibility={xLabelsVisibility}
//    xLabelWidth={50}
//    data={data}
//    squares
//    onClick={(x, y) => test()}
//    cellStyle={(background, value, min, max, data, x, y) => ({
//      background: `rgb(66, 86, 244, ${1 - (max - value) / (max - min)})`,
//      fontSize: "11px",
//    })}
//    cellRender={value => value && `${value}%`}
//   />
//       </div>
      
//     )}

    }

    export default Table;