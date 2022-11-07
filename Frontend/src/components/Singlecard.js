import React, { Component} from 'react'
import Plot from "react-plotly.js"

export default class Singlecard extends Component{
  constructor(props){
    super();
    this.state = {data: props.allinfo}
  }

  addTraces(data){
    let traces = [];
    let years = [];
    let lines = {'Cured': {'y': []},
      'Newdiagnosed': {'y': []},
      'Totalsuffering': {'y': []}
    };

    data.map(each =>{
      years.push(each.year);
      lines.Cured.y.push(each.cured);
      lines.Newdiagnosed.y.push(each.newdiagnosed);
      lines.Totalsuffering.y.push(each.totalsuffering);
    })

    // console.log(lines)

    for(const [key,value] of Object.entries(lines)){
      traces.push({
        type: 'scatter',
        mode: 'lines+markers',
        marker: {
          size: 12,
        },
        x: years,
        y: value.y,
        name: key
      })
    }

    return traces;
  }

  render(){
    return(
      <div>
        <Plot 
          data = {this.addTraces(this.state.data)}
          layout={{
            width: 480,
            height: 500,
            title: `${this.state.data[0].disease}`
          }}
        />
      </div>
    )
  }
}