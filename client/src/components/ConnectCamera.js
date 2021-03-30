import React, { Component } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import { Container, Col, Form, FormGroup, Input } from "reactstrap";
class ConnectCamera extends Component {
  state = {
    cameraName: "",
    location: "",
    ipaddress: "",
    info: {},
    rtsp: "",
    email: this.props.email,
  };

  handelChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  // Stream = () => {
  //   var url = "ws://localhost:9999";
  //   var player = new JSMpeg.VideoElement("#video-canvas", url, {
  //     autoplay: true,
  //   });
  //   console.log(player);
  // };
  handleSubmit = (e) => {
    e.preventDefault();
    this.connect();
  };
  // getStreamIP = (cam) => {
  //   axios
  //     .post("/api/rtsp-stream/", cam)
  //     .then((res) => {
  //       this.setState({ rtsp: res.data });
  //       console.log(this.state.rtsp);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  componentDidMount() {
    console.log(this.state.email);
  }
  connect = () => {
    axios
      .post("/api/camera", this.state)
      .then((res) => {
        alert(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // getCameraInfo = () => {
  //   axios
  //     .get("/api/onvif")
  //     .then((res) => {
  //       console.log(res.data[0]);
  //       this.setState({
  //         info: res.data[0],
  //       });
  //       console.log(this.state.info);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  render() {

    return (
      <div className="center">
        <header>
          <h1>Enter your Camera Information Here</h1>
        </header>
        <Container className="d-flex align-items-center justify-content-center">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Form className="form" onSubmit={this.connect}>
              <Col>
                <FormGroup>
                  <Input
                    type="text"
                    name="cameraName"
                    id="txtname"
                    placeholder="Enter your Camera Name"
                    value={this.state.cameraName}
                    onChange={this.handelChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Input
                    type="text"
                    name="location"
                    id="txtlocation"
                    placeholder="Location"
                    value={this.state.location}
                    onChange={this.handelChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Input
                    type="text"
                    name="ipaddress"
                    id="txtaddress"
                    placeholder="Ip address"
                    value={this.state.ipaddress}
                    onChange={this.handelChange}
                  />
                </FormGroup>
              </Col>{" "}
              <Button onClick={this.connect}>Connect</Button>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

export default ConnectCamera;
// {

// }
