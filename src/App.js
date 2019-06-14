import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import FrontMessage from "./Components/FrontMessageEnvoi/front_message_envoi";
import FrontAccueil from "./Components/FrontAccueil/front_accueil"
import FrontIAO from "./Components/FrontIAO/front_iao"
import MessageBoard from './Components/MessageBoard/MessageBoard'
import FrontBocal from './Components/FrontBocal/front_bocal'

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "localhost:3001",

      ///
      color: "white"
      ///
    };
  }

  // render method that renders in code if the state is updated
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={FrontMessage} />
          <Route exact path="/accueil" component={FrontAccueil}/>
          <Route exact path="/iao" component={FrontIAO}/>
          <Route exact path="/bocal" component={FrontBocal}/>
          <Route exact path="/board" component={MessageBoard} />
        </div>
      </Router>
    );
  }
}

export default App;
