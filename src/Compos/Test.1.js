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
      receiver: "",
      sender: "",
      status: "",
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
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    console.log(this.state.receiver)
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
    const { messages, message, receiver } = this.state;
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
        <select 
          name="receiver"
          className="form-control"
          onChange={this.onChange}
          >
          <option value="" selected disabled hidden>Qui êtes vous?</option>
          <option value="IAO">IAO</option>
          <option value="Bocal">Bocal</option>
          <option value="Accueil">Accueil</option>
          <option value="Administration">Administration</option>
        </select>

        <select 
          className="form-control"
          onChange={this.onChange}
          name="sender"
          >
          <option value="" selected disabled hidden>Destinataire?</option>
          <option value="all">Tous</option>
          <option value="IAO">IAO</option>
          <option value="Bocal">Bocal</option>
          <option value="Accueil">Accueil</option>
          <option value="Administration">Administration</option>
        </select>

        <div className="form-group">
          <input
            name="message"
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
