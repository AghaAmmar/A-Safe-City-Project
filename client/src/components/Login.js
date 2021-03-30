import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Button } from "reactstrap";
import SignUp from "./SignUp";
import { MDBInput } from "mdbreact";
import { auth } from "../firebase";
class Login extends Component {
  state = {
    email: "",
    password: "",
    visible: true,
    error: "",
  };
  Loginsubmit = async (e) => {
    e.preventDefault();
    await auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {})
      .catch((err) => {
        this.setState({ error: "Invalid credentials" });
      });
  };
  handelChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div className="center">
        {/* <a href="http://tumblr.com" target="_blank" class="linkwrap">
          <div class="blocker"></div>
          <iframe
            width="420"
            height="315"
            src="http://192.168.0.102:8080/video"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </a> */}
        {this.state.visible ? (
          <Container className="border border-pink-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
            <h1 className="heading ">Sign In</h1>
            <Form className="" onSubmit={this.Loginsubmit}>
              <Col>
                <FormGroup>
                  <div className="label-login">{this.state.error}</div>
                  <MDBInput
                    label="Enter your email"
                    type="email"
                    name="email"
                    id="txtemail"
                    placeholder="Enter your email"
                    value={this.state.email}
                    onChange={this.handelChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <MDBInput
                    label="Enter your password"
                    type="password"
                    name="password"
                    id="txtpassword"
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={this.handelChange}
                  />
                </FormGroup>
              </Col>
              <Button onClick={this.Loginsubmit} color="pink">
                Sign In
              </Button>

              <Button
                color="pink"
                onClick={() => this.setState({ visible: false })}
              >
                Sign Up
              </Button>
            </Form>

            {/* <div>{JSON.stringify(this.state, 2, null)}</div> */}
          </Container>
        ) : (
          <div>
            <SignUp />
          </div>
        )}
      </div>
    );
  }
}

export default Login;
