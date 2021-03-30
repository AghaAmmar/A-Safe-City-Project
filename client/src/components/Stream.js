import React, { Component } from "react";
import Iframe from "react-iframe";
import axios from "axios";

import { Link } from "react-router-dom";
class Stream extends Component {
  state = {
    ipaddress: [],
    email: this.props.email,
    search: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  streams = () => {
    axios.get("/api/camera/public").then((res) => {
      this.setState({ ipaddress: res.data });
      console.log(this.state.ipaddress);
    });
  };
  componentDidMount = () => {
    this.streams();
  };
  render() {
    return (
      <div>
        <div className="search_bar">
          <input
            name="search"
            value={this.state.search}
            autoComplete="off"
            className="search"
            placeholder="Search"
            onChange={this.handleChange}
          ></input>
        </div>
        <div></div>
        <div>
          {this.state.ipaddress
            .filter((data) => {
              if (this.state.search === "") {
                return data;
              } else if (
                data.location
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase())
              ) {
                return data;
              }
            })
            .map((data) => (
              <div>
                <Link
                  to={{
                    pathname: `/view`,
                    state: data.views,
                    url: data.Ipaddress,
                  }}
                  class="linkwrap"
                >
                  <div class="blocker"></div>
                  <Iframe
                    width="350"
                    height="200"
                    allowFullScreen
                    frameBorder="0"
                    src={`http://${data.Ipaddress}:8080/video`}
                  ></Iframe>
                </Link>

                <h5>
                  <b>{data.location}</b>
                </h5>

                <span>View : {data.views}</span>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Stream;
