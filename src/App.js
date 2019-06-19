import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import FrontMessage from "./Components/FrontMessageEnvoi/front_message_envoi";
import FrontAccueil from "./Components/FrontAccueil/front_accueil";
import FrontIAO from "./Components/FrontIAO/front_iao";
import MessageBoard from "./Components/MessageBoard/MessageBoard";
import FrontBocal from "./Components/FrontBocal/front_bocal";
import Service from "./Components/ServiceCreation/Service";
import AccueilUser from "./Components/AccueilUser/AccueilUser";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={AccueilUser} />
          <Route path="/message" component={FrontMessage} />
          <Route path="/accueil" component={FrontAccueil} />
          <Route path="/iao" component={FrontIAO} />
          <Route path="/bocal" component={FrontBocal} />
          <Route path="/board" component={MessageBoard} />
          <Route path="/service" component={Service} />
        </Router>
      </div>
    );
  }
}

export default App;
