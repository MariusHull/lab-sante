import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

class Service extends Component {
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
    return <div>Hello !</div>;
  }
}

export default Service;
