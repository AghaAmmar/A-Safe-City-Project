import { Container } from "reactstrap";
import "./App.css";
import Login from "./components/Login";
import ConnectCamera from "./components/ConnectCamera";
import { auth } from "./firebase";
import React, { Component } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Stream from "./components/Stream";
import PrivateStream from "./components/PrivateStream";
import RecordForm from "./components/RecordForm";
import Setting from "./components/Setting";
import ViewCamera from "./components/ViewCamera";
import AccessCam from "./components/AccessCam";

class App extends Component {
  state = {
    user: {},
    email: "",
    name: "",
  };
  componentDidMount = () => {
    this.Auhthentication();
  };
  Auhthentication = async () => {
    await auth().onAuthStateChanged((user) => {
      if (user) {
        //console.log(user.email);
        this.setState({ user, email: user.email });

        console.log(this.state);
      } else {
        this.setState({ user: null, email: "" });
      }
    });
  };
  render() {
    return (
      <div>
        {this.state.user ? (
          <Router>
            <div>
              <NavBar email={this.state.email} />
              <Switch>
                <Route
                  path="/connect"
                  render={(props) => (
                    <ConnectCamera {...props} email={this.state.email} />
                  )}
                ></Route>
                <Route
                  path="/my"
                  render={(props) => (
                    <PrivateStream {...props} email={this.state.email} />
                  )}
                ></Route>
                <Route
                  path="/"
                  exact
                  render={(props) => (
                    <Stream {...props} email={this.state.email} />
                  )}
                ></Route>
                <Route
                  path="/record/"
                  render={(props) => (
                    <RecordForm {...props} email={this.state.email} />
                  )}
                ></Route>
                <Route
                  path="/setting"
                  render={(props) => (
                    <Setting {...props} email={this.state.email} />
                  )}
                ></Route>
                <Route
                  path="/view"
                  render={(props) => (
                    <ViewCamera {...props} email={this.state.email} />
                  )}
                ></Route>
                <Route
                  path="/accesscam"
                  render={(props) => (
                    <AccessCam {...props} email={this.state.email} />
                  )}
                ></Route>
              </Switch>
            </div>
          </Router>
        ) : (
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <Login />
            </div>
          </Container>
        )}
      </div>
    );
  }
}

export default App;
