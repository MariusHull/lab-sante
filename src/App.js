import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Test from "./Compos/Test";

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
