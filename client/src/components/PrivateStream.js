import React, { Component } from "react";
import axios from "axios";
import Iframe from "react-iframe";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class PrivateStream extends Component {
  state = {
    Ipdata: [],
    mode: "",
    email: this.props.email,
    ip: "",
    modal: false,
  };
  handelChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    // axios
    //   .post(`/api/camera/mode`, this.state)
    //   .then((res) => {
    //     alert(`Stream mode is ${this.state.mode}`);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  myStream = () => {
    const email = this.props.email;
    console.log(email);
    axios
      .get(`/api/camera/${email}`)
      .then((res) => {
        console.log(res.data);
        this.setState({ Ipdata: res.data });
        console.log(this.state.Ipdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  changeMode = (ip) => {
    console.log("Submitted " + this.state.mode + " mode " + ip.Ipaddress);
  };

  componentDidMount = () => {
    this.myStream();
  };
  isToggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  render() {
    return (
      <div>
        <div className="center">
          <h1>Private Streams</h1>
        </div>
        <div>
          {this.state.Ipdata.map((ip) => (
            <div key={ip.Ipaddress}>
              <Iframe
                width="350"
                height="200"
                allowFullScreen
                frameBorder="0"
                src={`http://${ip.Ipaddress}:8080/video`}
              ></Iframe>
              <h1>{ip.location}</h1>
              <Link
                to={{
                  pathname: `/record`,
                  ip: ip.Ipaddress,
                }}
              >
                <Button>Record</Button>
              </Link>
              <Link
                to={{
                  pathname: `/setting`,
                  ip: ip.Ipaddress,
                  location: ip.location,
                }}
              >
                <Button>Setting</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default PrivateStream;
