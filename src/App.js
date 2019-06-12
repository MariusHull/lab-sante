import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import logo from "./logo.svg";
import "./App.css";

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

  componentDidMount = () => {
    const socket = socketIOClient(this.state.endpoint);
    setInterval(this.send(), 1000);
    socket.on("change color", col => {
      document.body.style.backgroundColor = col;
    });
  };

  // sending sockets
  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("change color", this.state.color); // change 'red' to this.state.color
  };

  // adding the function
  setColor = color => {
    this.setState({ color });
  };

  // render method that renders in code if the state is updated
  render() {
    const socket = socketIOClient(this.state.endpoint);
    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={() => this.send()}>Change Color</button>

        <button id="blue" onClick={() => this.setColor("blue")}>
          Blue
        </button>
        <button id="red" onClick={() => this.setColor("red")}>
          Red
        </button>
      </div>
    );
  }
}

export default App;
