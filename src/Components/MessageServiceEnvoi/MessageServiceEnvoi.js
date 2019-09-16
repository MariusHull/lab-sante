import React, { Component } from "react";
import "./MessageServiceEnvoi.css";
import Axios from "axios";
//import { DropdownButton, Dropdown, Form } from "react-bootstrap";
import { url } from "../../config.js";
import socketIOClient from "socket.io-client";
//import ReactTooltip from "react-tooltip";

const socket = socketIOClient(url);

class MessageServiceEnvoi extends Component {
  constructor() {
    super();
    this.state = {
      services: [],
      supportVoice:
        "SpeechRecognition" in window ||
        "webkitSpeechRecognition" in window ||
        "mozSpeechRecognition" in window ||
        "msSpeechRecognition" in window,
      placeholder: "Ecrire un message...",
      recording: false,
      sender: null,
      receiver: null,
      message: null,
      color: "green",
      message: "",
      receiver: "",
      sender: "",
      status: "",
      hours: 0,
      days: 0,
      services: []
    };
  }

  componentWillMount = () => {
    Axios.get(`${url}/services/`).then(res => {
      this.setState({ services: res.data });
    });
  };

  onChange = e => {
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onChangeStatus = value => {
    // let state = this.state;
    // state[e.target.name] = e.target.value;
    this.setState({ status: value }, () => this.onSubmit());
  };

  onSubmit = e => {
    const { hours, days } = this.state;
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
      color: color,
      outdated: false
    });

    socket.emit("Message", {
      sender: this.state.sender,
      receiver: this.state.receiver,
      body: this.state.message,
      updated_at: Date.now(),
      status: "information",
      color: color,
      outdated: false,
      expiration: (hours + 24 * days) * 3600 * 1000
    });
    this.setState({
      message: "",
      hours: 0,
      days: 0
    });
  };

  //   changeValue(event) {
  //     this.setState({
  //       message: event.target.value
  //     });
  //   }

  //   componentDidMount() {
  //     if (this.state.supportVoice) {
  //       this.recognition = new (window.SpeechRecognition ||
  //         window.webkitSpeechRecognition ||
  //         window.mozSpeechRecognition ||
  //         window.msSpeechRecognition)();
  //       this.recognition.continuous = true;
  //       this.recognition.interimResults = true;
  //       this.recognition.lang = this.props.lang || "fr";
  //       this.recognition.onresult = event => {
  //         let interimTranscript = "";
  //         let finalTranscript = "";
  //         for (let i = event.resultIndex; i < event.results.length; ++i) {
  //           if (event.results[i].isFinal) {
  //             finalTranscript += event.results[i][0].transcript;
  //             this.setState({
  //               message: finalTranscript
  //             });
  //             if (this.props.onChange) this.props.onChange(finalTranscript);
  //             if (this.props.onEnd) this.props.onEnd(finalTranscript);
  //           } else {
  //             interimTranscript += event.results[i][0].transcript;
  //             this.setState({
  //               message: interimTranscript
  //             });
  //             if (this.props.onChange) this.props.onChange(interimTranscript);
  //           }
  //         }
  //       };
  //     }
  //   }

  //   changeSender(value) {
  //     this.setState({ sender: value });
  //   }

  //   changeReceiver(value) {
  //     this.setState({ receiver: value });
  //   }

  //   changeMessage(value) {
  //     this.setState({ message: value });
  //   }

  questionnaire = () => {
    const { message, services, sender, receiver, hours, days } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col">
            Émetteur <br />{" "}
            <select
              name="sender"
              className="form-control"
              onChange={this.onChange}
            >
              <option value="" selected disabled hidden>
                (choisir)
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
            <br />
          </div>
          <div className="col">
            Destinataire
            <br />
            <select
              className="form-control"
              onChange={this.onChange}
              name="receiver"
            >
              <option value="" selected disabled hidden>
                (choisir)
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
        </div>
        <br />
        <br />
        <div className="form-group">
          <textarea
            name="message"
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            value={message}
            onChange={this.onChange}
            placeholder="Message"
            maxlength="256"
          />
        </div>
        <div class="form-inline">
          Durée de validité du message :
          <div class="form-group mx-sm-3 mb-2">
            <input
              type="text"
              class="form-control"
              id="inputPassword2"
              placeholder="Password"
              value={hours}
              name="hours"
              onChange={this.onChange}
            />
            &nbsp; heure(s)
          </div>
          <div class="form-group mx-sm-3 mb-2">
            <input
              type="text"
              class="form-control"
              id="inputPassword3"
              placeholder="Password"
              value={days}
              name="days"
              onChange={this.onChange}
            />
            &nbsp; jour(s)
          </div>
        </div>
        {sender !== "" && receiver !== "" && (days > 0 || hours > 0) ? (
          <button
            type="button"
            onClick={() => this.onSubmit()}
            className="col btn btn-success"
          >
            Envoyer le message &nbsp; <i class="far fa-paper-plane" />
          </button>
        ) : (
          <button
            type="button"
            disabled
            onClick={() => this.onSubmit()}
            className="col btn btn-success"
          >
            Envoyer le message &nbsp; <i class="far fa-paper-plane" />
          </button>
        )}
      </div>
    );
  };

  //   onTouchStartMic() {
  //     if (!this.state.recording) {
  //       this.setState(
  //         { recording: true, placeholder: "Enregistrement en cours..." },
  //         () => {
  //           if (this.state.supportVoice) {
  //             this.recognition.start();
  //           }
  //         }
  //       );
  //     }
  //   }

  //   onTouchEndMic() {
  //     if (this.state.recording) {
  //       this.setState(
  //         { recording: false, placeholder: "Ecrire un message..." },
  //         () => {
  //           if (this.state.supportVoice) {
  //             this.recognition.stop();
  //           }
  //         }
  //       );
  //     }
  //   }

  render() {
    //const { message, services } = this.state;
    return (
      <div>
        <div className="row1accueil bienvenue titretext">
          Bienvenue aux Urgences de Melun
        </div>
        <div className="container">
          <div className="card">
            <h4 className="card-header">Message de service </h4>
            <div className="card-body">
              <p>
                Vous pouvez ici envoyer des messages de service. Vous pouvez
                choisir à qui ils s'adressent et leur durée d'expiration.
              </p>
              {this.questionnaire()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageServiceEnvoi;
