import React, {Component} from 'react';
import {Bar, Line} from 'react-chartjs-2';


class ChartDesign extends Component{
  render(){
    if(this.props.kind==='profile'){
      return (
        <div className="chart">
          <Bar
            data={this.props.chartData}
            options={{
              responsive: true,
              title:{
                display:this.props.displayTitle,
                text:'Profile Graph',
                fontSize:25
              },
              tooltips: {
                mode: 'index',
                intersect: false,
                enabled:true
              },
              legend:{
                // display: this.props.displayLegend,
                display: true,
                position: 'right',
                // position:this.props.legendPosition,
                labels:{ fontColor:'#000'}
              },
              layout:{
                padding:{ left:50, right:0, bottom:0, top:10 }
              },
              scales: {
                xAxes: [{  stacked: true, }],
                yAxes: [{  display: true,
                           stacked: true,
                           ticks: {
                             suggestedMin: 0,
                             //max: 100,
                             stepSize: 20,
                             // maxTicksLimit: 5
                           }
                        }]
                }
            }}
          />
        </div>
      )
    }else if(this.props.kind==='budget'){
      return(
        <div className="chart">
          <Line
            data={this.props.chartData}
            options={{
              responsive: true,
              title:{
                display:this.props.displayTitle,
                text:'Budget Graph',
                fontSize:25,
                fill: false
              },
              legend:{
                display: this.props.displayLegend,
                position:this.props.legendPosition,
                labels:{ fontColor:'#000'}
              },
              layout:{
                padding:{ left:0, right:0, bottom:0, top:0 }
              },
              scales: {
                xAxes: [{
                  gridLines: {
                    drawBorder: true,
                    // color: {a}
                    // color: ['rgba(235, 235, 235, 1.0)','rgba(235, 235, 235, 1.0)','rgba(235, 235, 235, 1.0)','rgba(235, 235, 235, 1.0)','rgba(255, 0, 0, 1.0)','rgba(235, 235, 235, 1.0)','red','rgba(235, 235, 235, 1.0)','rgba(235, 235, 235, 1.0)','rgba(235, 235, 235, 1.0)','rgba(235, 235, 235, 1.0)','rgba(235, 235, 235, 1.0)','rgba(235, 235, 235, 1.0)']
                  },
                }],
                yAxes: [{
                        ticks: {
                        suggestedMin: 0,
                        // max: 0,
                        // stepSize: 100,
                        maxTicksLimit: 10
                    }
                 }]
                }
            }}
          />
        </div>
      )
    } else {
      return (alert('You are not loading a valid graph type'));
    }
  }
}

export default ChartDesign;
