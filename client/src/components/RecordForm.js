import React, { Component } from "react";
import { Container, Col, Form, FormGroup,  Input } from "reactstrap";
import { Button } from "reactstrap";
import axios from "axios";
class RecordForm extends Component {
  state = {
    ip: this.props.history.location.ip,
    rtsp: "",
    path: "",
    btnText: "Turn On Recording",
  };
  componentDidMount() {
    //let params = queryString.parse(this.props.match.params.ip);
    console.log(this.state.ip);
    console.log(this.props.email);
  }
  handelChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.record();
  };
  record =  () => {
    if (this.state.btnText === "Turn On Recording") {

       axios.post("/api/record", this.state).then((res) => {
        if (res.status === 200) {
          alert("Recording start");
          this.setState({ btnText: "Turn Off Recording" });
        }
      });
      
    } else {
       axios.post("/api/record", this.state).then((res) => {
        if (res.status === 200) {
          alert("Recording stop");
          this.setState({ btnText: "Turn On Recording" });
        }
      });
      
    }

    console.log(this.state);
  };
  render() {
    return (

      <div className="center">
        <h2>Enter your Camera RTSP Link and Path to Record</h2>
        <Container className="d-flex align-items-center justify-content-center">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Form className="form" onSubmit={this.record}>
              <Col>
                <FormGroup>
                  <Input
                    type="text"
                    name="rtsp"
                    id="txtrtsp"
                    placeholder="Enter your camera RTSP link"
                    value={this.state.rtsp}
                    onChange={this.handelChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Input
                    type="text"
                    name="path"
                    id="txtpath"
                    placeholder="Enter path e.g : C://Folder"
                    value={this.state.path}
                    onChange={this.handelChange}
                  />
                </FormGroup>
              </Col>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={this.record}>{this.state.btnText}</Button>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

export default RecordForm;
