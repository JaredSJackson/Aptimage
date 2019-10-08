import React from 'react';
import AnalyticsTech from './AnalyticsTech';
import AnalyticsUser from './AnalyticsUser';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTech: true,
      showUser: false
    };
    this.showHide = this.showHide.bind(this);
  }

  render() {
    return (
      <div>
        <AnalyticsUser />;
        <AnalyticsTech />;
      </div>
    );
  }
}

export default App;
