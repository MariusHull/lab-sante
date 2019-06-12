import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "../App.css";

const socket = socketIOClient("localhost:3001");

export default class Test extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "localhost:3001",

      ///
      color: "white",
      message: "",
      ///
      messages: [
        { body: "Heyyyyy" },
        { body: "Heyyyyy2" },
        { body: "Heyyyyy3" }
      ]
    };
  }

  componentWillMount = () => {};

  onChange = e => {
    let { message } = this.state;
    message = e.target.value;
    this.setState({ message });
  };

  onSubmit = e => {
    console.log(this.state.message);
    socket.emit("Message IOA", this.state.message);
    this.setState({ message: "" });
  };

  // adding the function
  setColor = color => {
    this.setState({ color });
  };

  // render method that renders in code if the state is updated
  render() {
    const { messages, message } = this.state;
    socket.on("New message", mess => {
      console.log("Messages : ", mess);
      messages.push(mess);
      this.setState({ messages });
    });
    return (
      <div style={{ textAlign: "center" }}>
        {/* <button onClick={() => this.send()}>Change Color</button>

        <button id="blue" onClick={() => this.setColor("blue")}>
          Blue
        </button>
        <button id="red" onClick={() => this.setColor("red")}>
          Red
        </button> */}
        {messages &&
          messages.map((message, index) => {
            return (
              <div>
                <hb />
                {message.body}
              </div>
            );
          })}
        <h2>Votre message : </h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            value={message}
            onChange={this.onChange}
            placeholder="Name"
          />
          <button onClick={this.onSubmit}>Envoyer</button>
        </div>
      </div>
    );
  }
}
