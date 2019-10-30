import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AnalyticsTotal from './AnalyticsTotal';
import AnalyticsTech from './AnalyticsTech';
import AnalyticsUser from './AnalyticsUser';
import NavBar from './NavBar';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path="/Analysis" component={AnalyticsTotal} />
            <Route path="/TechAnalysis" component={AnalyticsTech} />
            <Route path="/UserAnalysis" component={AnalyticsUser} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
