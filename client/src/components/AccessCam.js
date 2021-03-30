import axios from "axios";
import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Input } from "reactstrap";
import { Button } from "reactstrap";
import Iframe from "react-iframe";
class AccessCam extends Component {
  state = {
    email: "",
    userid: "",
    password: "",
    error: "",
    url:""
  };
  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `/api/camera/accesscam/${this.state.email}/${this.state.userid}/${this.state.password}`
      )
      .then((res) => {
        if (res.data.length === 0) {
          this.setState({ error: "User id or password is wrong" });
        }
        else{
          this.setState({url:res.data[0].Ipaddress})
          console.log(this.state)
        }
        console.log(res);
      })
      .catch(() => {
        this.setState({ error: "Please enter all required fields" });
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
        <h2>Enter Userid and Password to access Private Camera</h2>
        <Container className="d-flex align-items-center justify-content-center">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Form className="form" onSubmit={this.handleSubmit}>
              <Col>
                <FormGroup>
                  <div className="label-login">{this.state.error}</div>
                  <Input
                    type="email"
                    name="email"
                    id="txtemail"
                    placeholder="Enter email of the owner of camera"
                    value={this.state.email}
                    onChange={this.handelChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Input
                    type="text"
                    name="userid"
                    id="txtid"
                    placeholder="Enter userid"
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
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handelChange}
                  />
                </FormGroup>
              </Col>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={this.handleSubmit}>Connect</Button>
              </div>
            </Form>
            {this.state.url.length !== 0 && (
              <Iframe
                width="450"
                height="650"
                allowFullScreen
                frameBorder="0"
                src={`http://${this.state.url}:8080/video`}
              ></Iframe>
            )}
          </div>
        </Container>
      </div>
    );
  }
}

export default AccessCam;
