import * as React from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryAnimation,
  VictoryLabel
} from 'victory';
import { DatePicker } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
// import { throwStatement } from '@babel/types';
const { RangePicker } = DatePicker;
function onChange(date, dateString) {
  console.log(date, dateString);
}

var progressCirclePercent;
var employeeArray;

//, VictoryTheme
class AnalyticsTech extends React.Component {
  constructor() {
    super();
    this.state = {
      percent: 0,
      data: this.getData(0), //dunno waht this is tbh
      clicked: false,
      dataResp: 0
    };
  }

  // colors
  // 90-100 blue: #0008ff
  // 70%-89% = light blue: #8fcbff
  // 69%-51% = gold; #f0cf16
  // 50% and lower = purple: #c91ac4

  // firstCall() {
  //   axios
  //     .post('https://aptimage.net/API/GetTechID.aspx', {})
  //     .then(function(response) {
  //       // turns the response into string
  //       employeeArray = JSON.stringify(response.data.techIDFound).toString();
  //       // console.log('hello\n' + strThis2);
  //       // var array = strThis2.split(',');
  //       // console.log(response.data.techIDFound);
  //       // gets the total number from the API
  //       // barPercent = parseInt(array[0].replace(/[^0-9.]/g, ''));
  //       // console.log(barPercent);
  //       return employeeArray;
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }

  // refreshes the data according to date
  // submitHandler = event => {
  //   event.preventDefault();
  //   console.log(this.state);
  //   //moved the axios here to only send when you press submit
  //   axios
  //     .post('https://aptimage.net/API/GetTechRatingTotal.aspx', {})
  //     .then(function(response) {
  //       // turns the response into string
  //       var strThis = JSON.stringify(response.data.ratingsFound[0]).toString();
  //       console.log('this is strThis ' + strThis);

  //       // gets the total number from the API
  //       progressCirclePercent = parseInt(strThis.replace(/[^0-9\.]/g, ''));
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // };

  componentDidMount = () => {
    // test call to display "joe's" progress bar
    // axios
    //   .post('https://aptimage.net/API/GetTechRatingBars.aspx', {})
    //   .then(function(response) {
    //     // turns the response into string
    //     var strThis2 = JSON.stringify(response.data.ratingsFound[0]).toString();
    //     var array = strThis2.split(',');
    //     // console.log(array);
    //     // gets the total number from the API
    //     barPercent = parseInt(array[0].replace(/[^0-9.]/g, ''));
    //     // console.log(barPercent);
    //     return barPercent;
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });

    // test call to the list of tech ids
    axios
      .post('https://aptimage.net/API/GetTechID.aspx', {})
      .then(function(response) {
        // turns the response into string then to an object so the data can be shown
        employeeArray = JSON.parse(
          JSON.stringify(response.data.techIDFound).toString()
        );
        // console.log('hello\n' + strThis2);
        // var array = strThis2.split(',');
        // console.log(response.data.techIDFound);
        // gets the total number from the API
        // barPercent = parseInt(array[0].replace(/[^0-9.]/g, ''));
        console.log(employeeArray);
        // return employeeArray;
      })
      .catch(function(error) {
        console.log(error);
      });

    // gets the data from the database upon page load for the progress circle
    axios
      .post('https://aptimage.net/API/GetTechRatingTotal.aspx', {})
      .then(function(response) {
        // turns the response into string
        var strThis = JSON.stringify(response.data.ratingsFound[0]).toString();
        // gets the total number from the API
        progressCirclePercent = parseInt(strThis.replace(/[^0-9.]/g, ''));
      })
      .catch(function(error) {
        console.log(error);
      });

    // information for the progress circle
    this.setStateInterval = window.setInterval(() => {
      let percent = progressCirclePercent; // changes the final product

      percent = percent > 100 ? 0 : percent;
      this.setState({
        percent,
        data: this.getData(percent)
      });
    }, 2000);
  };

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          {/* Date picker */}
          <div>
            <h1>Pick Date Range</h1>
            <RangePicker onChange={onChange} />
            <button>submit</button>
          </div>
          <div className="progress-circle">
            <h1>Total Progress Made Using AptImage According to Employees</h1>

            {/* Progress circle */}
            <svg viewBox="0 0 500 500" width="500px" height="500px">
              <VictoryPie
                standalone={false} //this shows the progress line
                animate={{ duration: 1000 }}
                width={400}
                height={400}
                data={this.state.data}
                innerRadius={120}
                cornerRadius={25}
                labels={() => null}
                style={{
                  data: {
                    fill: ({ datum }) => {
                      const color = datum.y > 60 ? 'green' : 'red';
                      return datum.x === 1 ? color : 'transparent';
                    }
                  }
                }}
              />
              <VictoryAnimation duration={1000} data={this.state}>
                {newProps => {
                  return (
                    <VictoryLabel
                      textAnchor="middle"
                      verticalAnchor="middle"
                      x={200}
                      y={200}
                      text={`${Math.round(newProps.percent)}%`}
                      style={{ fontSize: 45 }}
                    />
                  );
                }}
              </VictoryAnimation>
            </svg>
          </div>

          {/* Bar graph */}
          <div>
            <h1>Progress by Employee</h1>
            <VictoryChart
              height={500}
              width={500}
              domainPadding={{ x: 50, y: [0, 20] }}
            >
              {/* {(this.barPercent = this.firstCall())} */}
              {/* {console.log(barPercent)} */}
              <VictoryBar
                horizontal
                style={{
                  data: {
                    fill: ({ datum }) =>
                      datum.y <= 49
                        ? '#c91ac4' // purple
                        : datum.y >= 50 && datum.y <= 69
                        ? '#f0cf16' // yellow
                        : datum.y >= 70 && datum.y <= 89
                        ? '#8fcbff' // light blue
                        : datum.y >= 90 && datum.y <= 100
                        ? 'green'
                        : 'black'
                  }
                }}
                // data needs to be taken from api
                data={employeeArray}
                labels={({ datum }) => `${datum.y}%`}
              />
            </VictoryChart>
          </div>
        </form>
      </div>
    );
  }
}

// example data to show how the x values should be displayed
// [
//   { x: 'joe', y: 30 },
//   { x: 'seven', y: 55 },
//   { x: 'zell', y: 100 },
//   { x: 'ren', y: 70 },
//   { x: 'paq', y: 30 },
//   { x: 'netta', y: 55 },
//   { x: 'tero', y: 100 },
//   { x: 'ras', y: 70 },
//   { x: 'ker', y: 30 },
//   { x: 'owm', y: 55 },
//   { x: 'yev', y: 100 },
//   { x: 'bekkin', y: 70 }
// ]

export default AnalyticsTech;
