import axios from "axios";
import React, { Component } from "react";

class ViewCamera extends Component {
  state = {
    email: this.props.email,
    ip: this.props.history.location.url,
    views: this.props.history.location.state,
  };
  componentDidMount = () => {
    console.log(this.state);
    this.setViews();
  };
  componentWillUnmount = () => {
    axios.post("/api/camera/UnView", this.state).then((res) => {
      if (res.status === 200) {
        console.log("Views saved");
      }
    });
  };
  setViews = async () => {
    axios.post("/api/camera/view", this.state).then((res) => {
      if (res.status === 200) {
        console.log("Views saved");
        this.setState({ views: this.state.views + 1 });
      }
    });
  };
  render() {
    return (
      <div>
        <div className="center">
          <iframe
            title="viewStream"
            width="650"
            height="500"
            frameBorder="0"
            src={`http://${this.state.ip}:8080/video`}
            allowfullscreen
          ></iframe>
          <div className="views">
            <spna> {this.state.views} Views </spna>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewCamera;
