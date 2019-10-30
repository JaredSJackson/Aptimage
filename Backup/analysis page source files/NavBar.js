import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { Button, Icon } from 'antd';

const ButtonGroup = Button.Group;

class NavBar extends React.Component {
  render() {
    let buttonStyle = { shape: 'round' };
    return (
      <div className="analysis buttons">
        <Navbar bg="dark" variant="dark">
          <ButtonGroup>
            {/* <Navbar.Brand as={Link} href="/Analysis" to="/Analysis">
              Analysis Page
            </Navbar.Brand> */}
            <Nav className="ml-auto">
              <Button style={buttonStyle}>
                <Icon type="desktop" />
                <Nav.Link
                  as={NavLink}
                  href="/TechAnalysis"
                  to="/TechAnalysis"
                  exact
                >
                  Tech
                </Nav.Link>
              </Button>
              <Button style={buttonStyle}>
                <Icon type="mobile" />
                <Nav.Link
                  as={NavLink}
                  href="/UserAnalysis"
                  to="/UserAnalysis"
                  exact
                >
                  User
                </Nav.Link>
              </Button>
            </Nav>
          </ButtonGroup>
        </Navbar>
      </div>
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
