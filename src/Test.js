import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import logo from "./logo.svg";
import "./App.css";

export default class Test extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "localhost:3001",

      ///
      color: "white",
      message: "",
      ///
      socket: socketIOClient("")
    };
  }

  componentDidMount = () => {
    this.state.socket = socketIOClient(this.state.endpoint);
    setInterval(this.send(), 1000);
    this.state.socket.on("change color", col => {
      document.body.style.backgroundColor = col;
    });
  };

  onChange = e => {
    let { message } = this.state;
    message = e.target.value;
    this.setState({ message });
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
    const { socket } = this.state;
    socket.on("change color", col => {
      document.body.style.backgroundColor = col;
    });
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
