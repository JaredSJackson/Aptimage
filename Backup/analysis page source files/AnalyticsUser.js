import * as React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryAnimation,
  VictoryLabel,
  VictoryTooltip,
  VictoryVoronoiContainer
} from "victory";
import { DatePicker, Popover, Button } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import { Link, NavLink } from "react-router-dom";
// import { throwStatement } from '@babel/types';
const { RangePicker } = DatePicker;
function onChange(date, dateString) {
  console.log(date, dateString);
}

var progressCirclePercent;
var employeeArray;

//, VictoryTheme
class AnalyticsUser extends React.Component {
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

  componentDidMount = () => {
    // test call to the list of tech ids
    axios
      .post("https://aptimage.net/API/GetTechID.aspx", {})
      .then(function(response) {
        // turns the response into string then to an object so the data can be shown
        employeeArray = JSON.parse(
          JSON.stringify(response.data.techIDFound).toString()
        );

        console.log(employeeArray);
        // return employeeArray;
      })
      .catch(function(error) {
        console.log(error);
      });

    // gets the data from the database upon page load for the progress circle
    axios
      .post("https://aptimage.net/API/GetTechRatingTotal.aspx", {})
      .then(function(response) {
        // turns the response into string
        var strThis = JSON.stringify(response.data.ratingsFound[0]).toString();
        // gets the total number from the API
        progressCirclePercent = parseInt(strThis.replace(/[^0-9.]/g, ""));
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
    return [
      { x: 1, y: percent },
      { x: 2, y: 100 - percent }
    ];
  }

  clickLink() {
    // <link>click here</link>;
    console.log("was able to at least clikc");
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
            <h1>Total Progress Made Using AptImage According to Users</h1>

            {/* Progress circle */}
            <svg
              viewBox="0 0 500 500"
              width="50%"
              height="50%"
              // responsive={false} // does nothing to the circle
            >
              <VictoryPie
                // responsive={false} // does nothing to the circle
                standalone={false} //this shows the progress line
                animate={{ duration: 1000 }}
                // width={400}
                height={400}
                data={this.state.data}
                innerRadius={120}
                cornerRadius={25}
                labels={() => null}
                style={{
                  data: {
                    fill: ({ datum }) => {
                      const color = datum.y > 30 ? "green" : "red";
                      return datum.x === 1 ? color : "transparent";
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
              height={800}
              width={800}
              fontSize={50}
              domainPadding={{ x: 50, y: [0, 20] }}
              //label for the tech names
              // labelComponent={<VictoryTooltip />}
              containerComponent={
                <VictoryVoronoiContainer
                  responsive={false} // makes the graph a set size
                  mouseFollowTooltips
                  voronoiDimension="x" // allows for hovering over the x values
                  labels={({ datum }) => `tech name: ${datum.x}`} // displays the labels
                  // labels={({ datum }) => `tech id: ${datum.x}`}
                />
              }
            >
              <VictoryBar
                horizontal
                events={[
                  {
                    target: "data",
                    eventHandlers: {
                      // onClick: () => <link>click here</link>
                      onClick: () => {
                        // <Link>click here</Link>;
                        return [
                          {
                            target: "labels",
                            mutation: props => {
                              return props.text === "clicked"
                                ? null
                                : { text: "clicked" };
                            }
                          }
                        ];
                      }
                    }
                  }
                ]}
                style={{
                  data: {
                    fill: ({ datum }) =>
                      datum.y <= 50
                        ? "#c91ac4" // purple
                        : datum.y >= 51 && datum.y <= 69
                        ? "#f0cf16" // yellow
                        : datum.y >= 70 && datum.y <= 89
                        ? "#8fcbff" // light blue
                        : datum.y >= 90 && datum.y <= 100
                        ? "green"
                        : "black"
                  },
                  labels: { fontSize: 25 },
                  fontSize: 25
                }}
                // data needs to be taken from api
                data={[
                  { x: "joe", y: 30 },
                  { x: "seven", y: 55 },
                  { x: "zell", y: 100 },
                  { x: "ren", y: 70 },
                  { x: "paq", y: 30 },
                  { x: "netta", y: 55 },
                  { x: "tero", y: 100 },
                  { x: "ras", y: 70 },
                  { x: "ker", y: 30 },
                  { x: "owm", y: 55 },
                  { x: "yev", y: 100 },
                  { x: "bekkin", y: 70 }
                ]}
                // labels={({ datum }) => <Popover>`${datum.x}`</Popover>}
                // labels={({ datum }) => `${datum.x}%`}
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
// { x: 'joe', y: 30 },
// { x: 'seven', y: 55 },
// { x: 'zell', y: 100 },
// { x: 'ren', y: 70 },
// { x: 'paq', y: 30 },
// { x: 'netta', y: 55 },
// { x: 'tero', y: 100 },
// { x: 'ras', y: 70 },
// { x: 'ker', y: 30 },
// { x: 'owm', y: 55 },
// { x: 'yev', y: 100 },
// { x: 'bekkin', y: 70 }
// ]

// { x: 'joe', y: 30, label: 'tech 1' },
// { x: 'seven', y: 55, label: 'tech 2' },
// { x: 'zell', y: 100, label: 'tech 3' },
// { x: 'ren', y: 70, label: 'tech 4' },
// { x: 'paq', y: 30, label: 'tech 5' },
// { x: 'netta', y: 55, label: 'tech 6' },
// { x: 'tero', y: 100, label: 'tech 7' },
// { x: 'ras', y: 70, label: 'tech 8' },
// { x: 'ker', y: 30, label: 'tech 9' },
// { x: 'owm', y: 55, label: 'tech 10' },
// { x: 'yev', y: 100, label: 'tech 11' },
// { x: 'bekkin', y: 70, label: 'tech 12' }

export default AnalyticsUser;
