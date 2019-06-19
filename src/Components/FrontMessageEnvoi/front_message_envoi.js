import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./front_message_envoi.css";
import Navbar from "../../Containers/Navbar";
import Axios from "axios";
import { resolveSrv } from "dns";

// eslint-disable-next-line import/no-webpack-loader-syntax
import mic from './mic.gif';
// eslint-disable-next-line import/no-webpack-loader-syntax
import micAnimate from './mic-animate.gif'

const socket = socketIOClient("localhost:3001");


export default class FrontMessageEnvoi extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "localhost:3001",
      supportVoice: 'webkitSpeechRecognition' in window,
      ///
      color: "green",
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
    const color =
      this.state.services.filter(
        service => service.name === this.state.sender
      )[0].color || "black";
    console.log({
      sender: this.state.sender,
      receiver: this.state.receiver,
      body: this.state.message,
      updated_at: Date.now(),
      status: this.state.status,
      color: color
    });

    socket.emit("Message", {
      sender: this.state.sender,
      receiver: this.state.receiver,
      body: this.state.message,
      updated_at: Date.now(),
      status: this.state.status,
      color: color
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


  componentDidMount() {
    if (this.state.supportVoice) {
      const WebkitSpeechRecognition = window.webkitSpeechRecognition;
      this.recognition = new WebkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.props.lang || 'fr';
      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
            this.setState({
              message: finalTranscript,
            });
            if (this.props.onChange) this.props.onChange(finalTranscript);
            if (this.props.onEnd) this.props.onEnd(finalTranscript);
          } else {
            interimTranscript += event.results[i][0].transcript;
            this.setState({
              message: interimTranscript,
            });
            if (this.props.onChange) this.props.onChange(interimTranscript);
          }
        }
      };
    }
  }

  changeValue(event) {
    this.setState({
      message: event.target.value,
    });
  }

  say() {
    if (this.state.supportVoice) {
      if (!this.state.speaking) {
        // start listening
        this.recognition.start();
      } else {
        this.recognition.stop();
        const question = this.state.message;
      }
      this.setState({
        speaking: !this.state.speaking,
        message: '',
      });
    }
  }

  // render method that renders in code if the state is updated
  render() {
    var img = new Image(); // Crée un nouvel élément img
    img.src = "./images.jpeg";

    const { messages, message, services } = this.state;
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
        <microphone/>

        <div className="row1">
          <div className="col" id="colonne1">
            <select
              name="sender"
              className="form-control1"
              onChange={this.onChange}
            >
              <option value="" selected disabled hidden>
                Expéditeur ? (IOA)
              </option>
              {services &&
                services.map((service, index) => (
                  <option
                    key={index}
                    value={service.name}
                    color={service.color}
                  >
                    {service.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="col" id="colonne2">
            <select
              className="form-control2"
              onChange={this.onChange}
              name="receiver"
            >
              <option value="" selected disabled hidden>
                Destinataire ?
              </option>
              <option value="all" couleur="green">
                Tous
              </option>
              {services &&
                services.map((service, index) => (
                  <option
                    key={index}
                    value={service.name}
                    color={service.color}
                  >
                    {service.name}
                  </option>
                ))}
            </select>
          </div>
            



          <div className="row2">
            <div id="colonne3">

              <button className="form-control3" onClick={this.say.bind(this)}>
                <i class={this.state.speaking ? "" : "fas fa-microphone-alt"} style={{ fontSize: "500%" }} />
              </button>
            </div>

            <div className="form-group" id="colonne4">
              <textarea
                name="message"
                type="text"
                className="form-control4"
                aria-describedby="emailHelp"
                value={this.state.message}
                onChange={this.changeValue.bind(this)}
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
