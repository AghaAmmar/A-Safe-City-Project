import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  Container,
} from "reactstrap";
import { auth, database } from "../firebase";
class NavBar extends Component {
  state = {
    isopen: false,
    email: this.props.email,
    name: "",
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  componentDidMount = () => {
    database()
      .collection("users")
      .where("email", "==", this.state.email)
      .get()
      .then((snapshot) => {
        console.log(snapshot);
        snapshot.forEach((doc) => {
          this.setState({ name: doc.data().name });
        });
      });
  };
  logout = () => {
    auth().signOut();
  };
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            {console.log(this.state)}
            <NavbarBrand className="mr-auto" href="">
              {this.state.email}
            </NavbarBrand>

            <Link to="/">
              <NavLink>Streams</NavLink>
            </Link>
            <Link to="/connect">
              <NavLink>Connect</NavLink>
            </Link>

            <Link to="/my">
              <NavLink>My Streams</NavLink>
            </Link>
            <Link to="/accesscam">
              <NavLink>Access Cam</NavLink>
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <Link to="/">
                  <Button onClick={this.logout}>Logout</Button>
                </Link>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
