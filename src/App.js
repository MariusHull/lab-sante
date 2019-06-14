import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Test from "./Compos/Test";
import FrontAccueil from "./front_accueil/front_accueil"

import MessageBoard from './Components/MessageBoard/MessageBoard'

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
          <Route exact path="/" component={Test} />
<<<<<<< HEAD
          <Route exact path="/accueil" component={FrontAccueil} />
          {/* <Route exact path="/notifs" component={MessageBoard} /> */}
=======
          <Route exact path="/board" component={MessageBoard} />
>>>>>>> fa9d9367703ded72b1b84e7a1f6b40c7114c8f5b
        </div>
      </Router>
    );
  }
}

export default App;
