import * as React from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryAnimation,
  VictoryLabel
} from 'victory';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;
function onChange(date, dateString) {
  console.log(date, dateString);
}

//, VictoryTheme
class AnalyticsTech extends React.Component {
  constructor() {
    super();
    this.state = {
      percent: 0,
      data: this.getData(0), //dunno waht this is tbh
      clicked: false
      // style: {
      //   data: { fill: 'red' } //changes the color of the bargraph
      //   // data: { fill: this.getColor(this.getData(datum.y)) } //changes the color of the bargraph
      // }
    };
  }

  // colors
  // 90-100 blue: #0008ff
  // 70%-89% = light blue: #8fcbff
  // 69%-51% = gold; #f0cf16
  // 50% and lower = purple: #c91ac4

  componentDidMount() {
    let percent = 50; // changes the final product
    this.setStateInterval = window.setInterval(() => {
      // percent += (Math.random() * 25);
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

  // hashTable(obj) {
  //   this.length = 0;
  //   this.items = {};
  //   for (var p in obj) {
  //     if (obj.hasOwnProperty(p)) {
  //       this.items[p] = obj[p];
  //       this.length++;
  //     }
  //   }
  // }

  render() {
    // var h = new hashTable({ joe: 20, seven: 7, zell: 80, ren: 100 });

    return (
      <div>
        <div>
          <h1>Pick Date Range</h1>
          <RangePicker onChange={onChange} />
        </div>
        <div className="progress-circle">
          <h1>Total Progress Made Using AptImage According to Employees</h1>

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
              // style={this.state.style}
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
                      ? 'red' //blue
                      : 'green'
                }
              }}
              data={[
                { x: 'joe', y: 30 },
                { x: 'seven', y: 55 },
                { x: 'zell', y: 99 },
                { x: 'ren', y: 70 }
              ]}
              labels={({ datum }) => `${datum.y}%`}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default AnalyticsTech;
