import React, { Component } from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import "./App.css";
import FrontMessage from "./Components/FrontMessageEnvoi/front_message_envoi";
import FrontAccueil from "./Components/FrontAccueil/front_accueil";
import FrontIAO from "./Components/FrontIAO/front_iao";
import MessageBoard from "./Components/MessageBoard/MessageBoard";
import FrontBocal from "./Components/FrontBocal/front_bocal";
import Service from "./Components/ServiceCreation/Service";
import AccueilUser from "./Components/AccueilUser/AccueilUser";
import SwipeableRoutes from "react-swipeable-routes";
import MessageEnvoi from "./Components/MessageEnvoi/MessageEnvoi"

class App extends Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Router>
          <Route exact path="/" component={() => <Redirect to='/device' />} />
          <Route path="/user" component={AccueilUser} />
          <Route path="/accueil" component={FrontAccueil} />
          <Route path="/iao" component={FrontIAO} />
          <Route path="/bocal" component={FrontBocal} />
          <Route path="/board"
            render={(props) => <MessageBoard {...props} />} />
          <Route path="/service" component={Service} />
          <Route path="/device" component={() =>
            <div style={{ height: "100%" }}>
              <div style={{ backgroundColor: "green", height: "0%" }}></div>
              <SwipeableRoutes style={{ height: "100%" }} containerStyle={{ width: "100%", height: "100%" }} replace resistance={false} enableMouseEvents>
                <Route path="/device/message" component={FrontMessage} />
                <Route path="/device/newFrontEnvoi" render={() => <MessageEnvoi />} />
                <Route path="/device/boardScroll" render={(props) => <MessageBoard {...props} canScroll />} />
              </SwipeableRoutes>
            </div>
          } />
        </Router>
      </div >
    );
  }
}

export default App;
