import * as React from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryAnimation,
  VictoryLabel
} from 'victory';
//, VictoryTheme
class AnalyticsTech extends React.Component {
  constructor() {
    super();
    this.state = {
      percent: 0,
      data: this.getData(0), //dunno waht this is tbh
      clicked: false,
      style: {
        data: { fill: 'tomato' } //changes the color of the bargraph
      }
    };
  }

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

  render() {
    return (
      <div>
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
              style={this.state.style}
              data={
                // color = {datum.y > 30 ? "green" : "red"},
                ({ fill: 'lime' },
                [
                  { x: 'joe', y: 2 },
                  { x: 'seven', y: 3 },
                  { x: 'zell', y: 5 },
                  { x: 'ren', y: 4 }
                ])
              }
              labels={({ datum }) => `${datum.y}%`}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}
export default AnalyticsTech;
