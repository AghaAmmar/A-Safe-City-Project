import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { Button } from "reactstrap";

import axios from "axios";
class Setting extends Component {
  state = {
    ip: this.props.history.location.ip,
    location: this.props.history.location.location,
    mode: "",
    email: this.props.email,
    userid: "",
    password: "",
  };
  componentDidMount = () => {
    console.log(this.state);
  };
  handelChange = async (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  save = (e) => {
    e.preventDefault();
    axios.post("/api/camera/mode", this.state).then((res) => {
      if (res.status === 200) {
        alert("Setting Updated");
      }
    });
  };
  render() {
    return (
      <div className="center">
        <Container className="d-flex align-items-center justify-content-center">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            {" "}
            <Form onSubmit={this.save}>
              <Col>
                <FormGroup>
                  <Input readOnly defaultValue={this.state.ip} />
                  <Input readOnly defaultValue={this.state.location} />
                </FormGroup>
                <div></div>
                <h3>Mode</h3>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="mode"
                      value="Public"
                      onChange={this.handelChange}
                    />{" "}
                    Public
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="mode"
                      value="Private"
                      onChange={this.handelChange}
                    />{" "}
                    Private
                  </Label>
                </FormGroup>
                {this.state.mode === "Private" && (
                  <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Col>
                      <FormGroup>
                        <Input
                          type="userid"
                          name="userid"
                          id="txtid"
                          placeholder="Enter user id"
                          value={this.state.userid}
                          onChange={this.handelChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Input
                          type="password"
                          name="password"
                          id="txtpassword"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.handelChange}
                        />
                      </FormGroup>
                    </Col>
                  </div>
                )}
              </Col>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button>Save Settings</Button>
              </div>
            </Form>{" "}
          </div>
        </Container>
      </div>
    );
  }
}

export default Setting;
