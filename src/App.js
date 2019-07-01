import React, { Component } from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import "./App.css";
import FrontMessage from "./Components/FrontMessageEnvoi/front_message_envoi";
import FrontAccueil from "./Components/FrontAccueil/front_accueil";
import FrontIAO from "./Components/FrontIAO/front_iao";
import MessageBoard from "./Components/MessageBoard/MessageBoard";
import FrontBocal from "./Components/FrontBocal/front_bocal";
import Service from "./Components/ServiceCreation/Service";
import AccueilUser from "./Components/AccueilUser/AccueilUser";
import SwipeableRoutes from "react-swipeable-routes";
import MessageEnvoi from "./Components/MessageEnvoi/MessageEnvoi";
import MessageServiceEnvoi from "./Components/MessageServiceEnvoi/MessageServiceEnvoi";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginService: null
    };
  }

  changeLoginService = service => {
    this.setState({ loginService: service }, () => {
      console.log(service);
    });
  };

  render() {
    return (
      <div style={{ height: "100%" }}>
        <Router>
          <Route exact path="/" component={() => <Redirect to="/device" />} />
          <Route path="/user" component={AccueilUser} />
          <Route path="/accueil" component={FrontAccueil} />
          <Route path="/iao" component={FrontIAO} />
          <Route path="/bocal" component={FrontBocal} />
          <Route path="/board" render={props => <MessageBoard {...props} />} />
          <Route path="/service" component={Service} />
          <Route path="/messageService" component={MessageServiceEnvoi} />
          <Route
            path="/device"
            component={() => (
              <div style={{ height: "100%" }}>
                <div style={{ backgroundColor: "white", height: "0%" }} />
                <SwipeableRoutes
                  style={{ height: "100%" }}
                  containerStyle={{ width: "100%", height: "100%" }}
                  replace
                  // resistance={false}
                  enableMouseEvents
                >
                  {/* <Route path="/device/message" component={FrontMessage} /> */}
                  <Route
                    path="/device/message"
                    render={props => (
                      <MessageEnvoi
                        {...props}
                        loginService={this.state.loginService}
                        changeLoginService={this.changeLoginService}
                      />
                    )}
                  />
                  <Route
                    path="/device/board"
                    render={props => (
                      <MessageBoard
                        {...props}
                        loginService={this.state.loginService}
                        canScroll
                      />
                    )}
                  />
                </SwipeableRoutes>
              </div>
            )}
          />
        </Router>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default App;
