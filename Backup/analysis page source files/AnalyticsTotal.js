import * as React from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryAnimation,
  VictoryLabel
} from 'victory';
import axios from 'axios';
//, VictoryTheme
var progressCirclePercent;

class AnalyticsTotal extends React.Component {
  constructor() {
    super();
    this.state = {
      percent: 0,
      data: this.getData(0), //dunno waht this is tbh
      clicked: false
      // style: {
      //   data: { fill: '#8fcbff' } //changes the color of the bargraph
      // }
    };
  }

  componentDidMount() {
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
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  }

  render() {
    return (
      <div>
        <div className="progress-circle">
          <h1>Total Progress Made Using AptImage</h1>

          {/* Progress circle */}
          <svg viewBox="0 0 500 500" width="50%" height="50%">
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
                    const color = datum.y > 30 ? 'green' : 'red';
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
            height={400}
            width={400}
            domainPadding={{ x: 50, y: [0, 20] }}
            // scale={{ x: "sqrt" }}
          >
            <VictoryBar
              horizontal
              style={{
                data: {
                  fill: ({ datum }) =>
                    datum.y <= 50
                      ? '#c91ac4'
                      : datum.y >= 51 && datum.y <= 69
                      ? '#f0cf16'
                      : datum.y >= 70 && datum.y <= 89
                      ? '#8fcbff'
                      : datum.y >= 90 && datum.y <= 100
                      ? 'green' //blue
                      : 'black'
                }
              }}
              data={
                // color = {datum.y > 30 ? "green" : "red"},
                [
                  { x: 'joe', y: 20 },
                  { x: 'seven', y: 60 },
                  { x: 'zell', y: 80 },
                  { x: 'ren', y: 90 }
                ]
              }
              labels={({ datum }) => `${datum.y}%`}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}
export default AnalyticsTotal;
