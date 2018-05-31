import React from 'react';
import ChartDesign from './ChartDesign';

//months defined in here.
const months_profile = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
//Create date for the year.
var date = new Date();
//Year is returned as 118 not as 2018, so it must be parse into int
var year = date.getYear().toString();
year = year.substring(1);
parseInt(year,0);
//Gets the current month
var month = date.getMonth();
//Initial month for the budget graph 0=January... 5=January... 11=December
var initial_month=1;
var deadline_month=6;
// var deadline_year=19;

class Chart extends React.Component {
    render() {
      //Budget graph data
      for (var i = 0, graphMonth_Budget=[]; i < 12+initial_month; i++) {
        graphMonth_Budget[i-initial_month]=((i%12)+1)+"/"+year;
        //Adds a year every time month is December
        if(i===11) year++;
        //Colors the current month
        if(i===month){
          graphMonth_Budget[i-initial_month]= 'current date';
        } //Colors the deadline month
        if(i===deadline_month){
          graphMonth_Budget[i-initial_month]= 'deadline';
        }
      }
      var budgetData = {
        labels: graphMonth_Budget,
        datasets: [
          {
            label:'Year 2018',
            lineTension: 0,
            data: this.props.data,
            backgroundColor:'rgba(131, 184, 189, 1.0)',
            borderColor:'rgba(131, 184, 189, 1.0)',
            fill: false
          }
        ]
      };

      //For used to sort the month circularly, may be on a function to be more optimized
      for (var j = 0, graphMonth=[], len=months_profile.length; j < len; j++) {
              graphMonth[j]=months_profile[(j+this.props.startDate)%len];
      }

        var chartData = {
          labels: graphMonth,
          datasets: []
        };

        var newDataset;
        //Define for color of the graph components
        let colors = 'rgba(';
        let colors2 = ',1.0)';
        let redA, grenA, blueA;
        let colors1;

        for (i = 1; i < 9; i++) {
            redA-=25;
            grenA-=25;
            blueA-=25;
            colors1 = colors+redA+','+grenA+','+blueA+colors2;
            newDataset = {
            label:'Project '+i,
            data: this.props.data,
            // backgroundColor:'rgba(91, 144, 149, 1.0)',
            backgroundColor: colors1,
            hoverBorderColor:'#000',
            hidden: false
          }
          // You add the newly created dataset to the list of `data`
          chartData.datasets.push(newDataset);
        }


      if(this.props.type==='profile'){
        return (
            <div>
              <ChartDesign chartData={chartData} kind={'profile'}/>
            </div>
        );
      } else if (this.props.type==='budget'){
         return(
           <div>
             <ChartDesign chartData={budgetData} kind={'budget'} legendPosition="right"/>
           </div>
         );
      }
    }
}

export default Chart;
