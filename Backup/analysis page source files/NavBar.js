import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
// import AnalyticsTech from './AnalyticsTech';
// import AnalyticsUser from './AnalyticsUser';

class NavBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} href="/Analysis" to="/Analysis">
          Analysis Page
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} href="/TechAnalysis" to="/TechAnalysis" exact>
            Tech
          </Nav.Link>
          <Nav.Link as={NavLink} href="/UserAnalysis" to="/UserAnalysis" exact>
            User
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     viewForm: false
  //   };
  //   this.techForm = null;
  // }

  // techForm() {
  //   // this.techForm = <AnalyticsTech />;
  //   this.setState({ viewForm: true });
  // }

  // render() {
  //   return (
  //     <div>
  //       <button onClick={() => this.techForm()}>
  //         <a href="/TechAnalysis">Technician</a>
  //       </button>
  //       <button>
  //         <a href="UserAnalysis">User</a>
  //       </button>
  //       {this.techForm}
  //       {this.state.viewForm ? <AnalyticsTech /> : ''}
  //     </div>
  //   );
  // }
}
export default NavBar;
