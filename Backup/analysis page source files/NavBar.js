import * as React from 'react';

class NavBar extends React.Component {
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

  render() {
    return (
      <div>
        <ul id="nav">
          <li>
            <a></a>
          </li>
        </ul>
      </div>
    );
  }
}
export default NavBar;
