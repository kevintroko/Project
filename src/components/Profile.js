import React, { Component } from 'react';
import '../css/Profile.css';
import Chart from './Chart';
import Auth from '../modules/Auth';
const jwt = require('jsonwebtoken');
const config = require('../../config');

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state={profile:[], graphData:[], userEmail: '', secretData: ''};
  }
  componentDidMount(){
    this.setState({ isLoading: true });
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
         this.setState({
            secretData:xhr.response.message
          });
          // decode the token using a secret key-phrase
          jwt.verify(this.state.secretData, config.jwtSecret, (err, decoded) => {
            // the 401 code is for unauthorized status
            if (err) { return res.status(401).end(); }
            this.setState({
                userEmail:decoded.sub
            });
            this.callApiGraph().then(data => (this.setState({graphData:data})));
            this.callApiProfile().then(data => (this.setState({profile:data})));
          });
      }
    });
    xhr.send();
  }


  //Calls the information from the graph of the profile database
  async callApiGraph() {
    let email = (Object.keys(this.props.location.query).length ==0) ?  this.state.userEmail : this.props.location.query.email;
    const response = await fetch('http://localhost:5000/working_projects?code='+email);
    const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
    return body;
  };
  //Calls the information from the person profile database
  async callApiProfile(){
    let email = (Object.keys(this.props.location.query).length ==0) ?  this.state.userEmail : this.props.location.query.email;
    const response = await fetch('http://localhost:5000/person_info?code='+email);
    const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
    return body;
  };



 profileCalculator(data_to_profile,date){
      let numberOfProjects=0;
      let names=[];
      this.state.graphData.map(p=>{
        if(!names.includes(p.name)){
          numberOfProjects++;
          names.push({name:p.name,code:p.code});
        }
        });
      let workload = 0;
      // let arrayOfData_d1 = ["August, 2018","September, 2018"];
      // let arrayOfData_d2 = ["September, 2018","October, 2018","October, 2018","December, 2018","December, 2018","January, 2019"];
      // let arrayOfWorkLoad_d = [10,10,10,10,10,10,10,10,10];
      let hiring_date, end_date, arrayMonth, elapsedForZero, elapsed,elapsed1;

      for (let a = 0; a < numberOfProjects; a++) {
        let counter=0;
        this.state.graphData.map(p=>{
            if (p.code===names[a].code){
              if (counter==0){
                    hiring_date = new Date(p.hiring_date);
                    end_date    = new Date(p.end_date);
                    workload    = p.workload;
                    arrayMonth  = [];
                    elapsedForZero =  Math.round((((((end_date-date)/1000)/60)/60)/24)/30);
                    for (let i = 0; i < elapsedForZero-1;i++){
                      arrayMonth.push(0);
                    }
                    elapsed     = Math.round((((((end_date-hiring_date)/1000)/60)/60)/24)/30);
                    elapsed1    = elapsed;
                    for (let i = 0; i < elapsed1; i++) {
                       arrayMonth.push(workload);
                    }
            }else{


                hiring_date = new Date(p.hiring_date);
                elapsedForZero =  Math.round((((((hiring_date-end_date)/1000)/60)/60)/24)/30);
                end_date    = new Date(p.end_date);
                workload    = p.workload;
                if(elapsed===1){
                  for (let i = 0; i < elapsedForZero;i++){
                    arrayMonth.push(0);
                  }
                }else {
                  for (let i = 0; i < elapsedForZero-1;i++){
                    arrayMonth.push(0);
                  }
                }
                elapsed     = Math.round((((((end_date-hiring_date)/1000)/60)/60)/24)/30);
                elapsed1    = elapsed;
                for (let i = 0; i < elapsed1; i++) {
                    arrayMonth.push(workload);
                }
        }
        counter++;
      }
     });
        data_to_profile.push(arrayMonth);
      }

      //Add empty array for teaching bar section
      data_to_profile.push([]);
      //Call the 100 hours - workload calculator
      //sumProfesorHours();
      return names;
    }

  render() {

    //Get the current date and therefore the month
    //It will be send trough the Chart.js prop
    const date = new Date();
    const month = date.getMonth();

    //Const is read only so I change it to let
    let data_to_profile=[];
    let names=this.profileCalculator(data_to_profile,date);
    function sumProfesorHours(){
        let sum=0; //The hours of workload substracting 100 hours
        let newArray=[];
        for (var y = 0; y < data_to_profile.length; y++) { //2 and [x][y]
            sum=0;
            for (let x = 0; x < data_to_profile.length-1; x++) { //3
              sum=sum+data_to_profile[x][y];
            }
            newArray.push(100-sum);
         }
         // for (let i = 0; i < data_to_profile.length; i++) { //2
         for (let i = 0; i < data_to_profile.length; i++) { //2
            data_to_profile[(data_to_profile.length-1)].push(newArray[i]);
          }
          //data_to_profile[4].push([0],[0],[0],[0]);
    }

    let first_name, last_name, email, department,office,isprofessor = "";
    this.state.profile.map(p=>(first_name=p.first_name));
    this.state.profile.map(p=>(last_name=p.last_name));
    this.state.profile.map(p=>(email=p.email));
    this.state.profile.map(p=>(department=p.department));
    this.state.profile.map(p=>(office=p.office));
    this.state.profile.map(p=>(isprofessor=p.isprofessor));
    if(isprofessor===1){isprofessor="Professor";}else {isprofessor="Student"}
    // let workload="";
    // this.state.graphData.map(p=>(workload=p.workload));



      //Add empty array for teaching bar section
      data_to_profile.push([]);
      //Call the 100 hours - workload calculator
      //sumProfesorHours();
  

    return (

      <div>
        <div className="title">
          Profile
        </div>
        <div className="row panel flex-center-vertically">
          <div className="col-3 margin-10">
            <p><span className="bold">Name: </span>{first_name}</p>
            <p><span className="bold">Lastname: </span> {last_name}</p>
            <p><span className="bold">Email: </span>{email}</p>
            <p><span className="bold">Department: </span>{department}</p>
            <p><span className="bold">Office: </span>{office}</p>
            <p><span className="bold">Role: </span>{isprofessor}</p>
          </div>
          <div className="col-9">
            <Chart data={data_to_profile} type="profile" startDate={month} names={names}/>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
