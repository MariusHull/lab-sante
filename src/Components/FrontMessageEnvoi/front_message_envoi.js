import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./front_message_envoi.css";
import Navbar from "../../Containers/Navbar";
import Axios from "axios";
import { resolveSrv } from "dns";

const socket = socketIOClient("localhost:3001");

export default class FrontMessageEnvoi extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "localhost:3001",

      ///
      color: "white",
      message: "",
      receiver: "all",
      sender: "IOA",
      status: "",
      services: []
      ///
    };
  }

  componentWillMount = () => {
    Axios.get("http://localhost:3001/services/").then(res => {
      this.setState({ services: res.data });
    });
  };

  onChange = e => {
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onChangeStatus = e => {
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state, () => this.onSubmit());
  };

  onSubmit = e => {
    console.log({
      sender: this.state.sender,
      receiver: this.state.receiver,
      body: this.state.message,
      updated_at: Date.now(),
      status: this.state.status
    });

    socket.emit("Message", {
      sender: this.state.sender,
      receiver: this.state.receiver,
      body: this.state.message,
      updated_at: Date.now(),
      status: this.state.status
    });
    this.setState({
      message: "",
      status: ""
    });
  };

  coucou = e => {
    console.log("coucou");
  };

  // adding the function
  setColor = color => {
    this.setState({ color });
  };

  // render method that renders in code if the state is updated
  render() {
    var img = new Image(); // Crée un nouvel élément img
    img.src = "./images.jpeg";

    const { messages, message } = this.state;
    return (
      <div>
        {/* <Navbar /> */}
        {/* <button onClick={() => this.send()}>Change Color</button>

        <button id="blue" onClick={() => this.setColor("blue")}>
          Blue
        </button>
        <button id="red" onClick={() => this.setColor("red")}>
          Red
        </button> */}
        {/*messages &&
          messages.map((message, index) => {
            return (
              <div>
                <hb />
                {message.body} DE : {message.sender}, A : {message.receiver},
                STATUS : {message.status}
              </div>
            );
          })*/}

        <div className="row1">
          <div className="col" id="colonne1">
            <select
              name="sender"
              className="form-control1"
              onChange={this.onChange}
            >
              <option value="" selected disabled hidden>
                Expéditeur? (IOA)
              </option>
              <option value="IOA">IOA</option>
              <option value="Bocal">Bocal</option>
              <option value="Accueil">Accueil</option>
              <option value="Administration">Administration</option>
            </select>
          </div>

          <div className="col" id="colonne2">
            <select
              className="form-control2"
              onChange={this.onChange}
              name="receiver"
            >
              <option value="" selected disabled hidden>
                Destinataire?
              </option>
              <option value="all">Tous</option>
              <option value="IOA">IOA</option>
              <option value="Bocal">Bocal</option>
              <option value="Accueil">Accueil</option>
              <option value="Administration">Administration</option>
            </select>
          </div>

          <div className="row2">
            <div id="colonne3">
              <button className="form-control3" onClick={this.coucou}>
                <i class="fas fa-microphone-alt" style={{ fontSize: "500%" }} />
              </button>
            </div>

            <div className="form-group" id="colonne4">
              <textarea
                name="message"
                type="text"
                className="form-control4"
                aria-describedby="emailHelp"
                value={message}
                onChange={this.onChange}
                placeholder="Message"
              />
            </div>
          </div>
          <div className="row3">
            <div id="colonne5">
              <button
                className="form-control5"
                name="status"
                onClick={this.onChangeStatus}
                value="important"
              >
                Important
              </button>
            </div>
            <div id="colonne6">
              <button
                className="form-control6"
                name="status"
                onClick={this.onChangeStatus}
                value="urgent"
              >
                Urgent
              </button>
            </div>
            <div id="colonne7">
              <button
                className="form-control7"
                name="status"
                onClick={this.onChangeStatus}
                value="information"
              >
                Information
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
