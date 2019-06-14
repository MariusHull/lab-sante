import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Test from "./Compos/Test";

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
        </div>
      </Router>
    );
  }
}

export default App;
