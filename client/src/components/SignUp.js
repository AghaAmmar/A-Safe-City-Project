import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Button } from "reactstrap";
import { MDBInput } from "mdbreact";
import { auth } from "../firebase";
import { database } from "../firebase";

import Login from "./Login";
class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    visible: true,
    ErrorName: "",
    ErrorEmail: "",
    ErrorPassword: "",
    UserError: "",
  };
  handelChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (this.state.password.length < 7) {
      this.setState({
        ErrorPassword: "Password length should not be less than 8",
      });
    } else {
      this.setState({ ErrorPassword: "" });
    }
  };
  userRegiter = (e) => {
    if (
      this.state.name.length < 3 &&
      this.state.email.length === 0 &&
      this.state.password.length < 7
    ) {
      this.setState({
        ErrorName: "Name  should not be empty",
        ErrorEmail: "Please enter your email",
        ErrorPassword: "Password length should not be less than 8",
      });
    } else if (this.state.name.length < 3) {
      this.setState({
        ErrorName: "Name length should not be empty",
        ErrorEmail: "",
      });
    } else if (this.state.email.length === 0) {
      this.setState({
        ErrorName: "",
        ErrorEmail: "Please enter your email",
      });
    } else if (this.state.password.length < 7) {
      this.setState({
        ErrorPassword: "Password length should not be less than 8",
      });
    } else {
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          database().collection("users").add({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
          });
        })
        .catch((err) => {
          this.setState({
            UserError: "User already exits",
          });
          console.log(err.message);
        });
      this.setState({
        ErrorName: "",
        ErrorEmail: "",
        ErrorPassword: "",
      });
    }
    e.preventDefault();
  };

  render() {
    return (
      <div className="center">
        {this.state.visible ? (
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <Container className="border border-pink-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
                <h1 className="heading">Sign up page</h1>
                <Form className="form" onSubmit={this.userRegiter}>
                  <Col>
                    <FormGroup>
                      <div className="label-signup">{this.state.ErrorName}</div>
                      <MDBInput
                        label="Enter your name"
                        type="text"
                        name="name"
                        id="txtname"
                        placeholder="Enter your name"
                        value={this.state.name}
                        onChange={this.handelChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <div className="label-signup">
                        {this.state.ErrorEmail}
                      </div>
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
                      <div className="label-signup">
                        {this.state.ErrorPassword}
                      </div>
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
                  <Button color="pink">Register</Button>
                  <Button
                    color="pink"
                    onClick={() => this.setState({ visible: false })}
                  >
                    Sign In
                  </Button>
                </Form>

                {/* <div>{JSON.stringify(this.state, 2, null)}</div> */}
              </Container>
            </div>
          </Container>
        ) : (
          <div>
            <Login />
          </div>
        )}
      </div>
    );
  }
}

export default SignUp;
