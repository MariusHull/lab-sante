import React from "react";
import "./MessageBoard.css";
import * as moment from "moment";
import "moment/locale/fr";
import Axios from "axios";
import socketIOClient from "socket.io-client";
import Navbar from "../../Containers/Navbar";
const socket = socketIOClient("localhost:3001");

class MessageBoard extends React.Component {
  constructor() {
    super();
    moment.locale("fr");
    this.state = {
      messageList: [
        {
          sender: "IOA",
          receiver: "Bocal",
          body: "Aide demandée au Box 3.",
          updated_at: Date.now(),
          status: "important"
        }
      ]
    };
  }

  colorFromSender(sender) {
    switch (sender) {
      case "IOA":
        return "blue";
      case "Bocal":
        return "green";
      case "Accueil":
        return "orange";
      default:
        return "red";
    }
  }

  displayMessage(message, index) {
    return (
      <div
        className="message"
        key={index}
        style={{ borderColor: this.colorFromSender(message.sender) }}
      >
        <div
          className="sender-container"
          style={{ backgroundColor: this.colorFromSender(message.sender) }}
        >
          <div className="sender-transparent">
            <div
              className="sender-content"
              style={{ fontWeight: 900, fontSize: 18 }}
            >
              {message.sender}
            </div>
            <div>{"à " + moment(message.updated_at).format("LT")}</div>
          </div>
        </div>
        <div className="message-container">
          <div className="message-content">{message.body}</div>
        </div>
      </div>
    );
  }

  displayEmergencyMessage(message) {
    return (
      <div className="emergency-container">
        <div className="emergency-popup">
          <div>{message.body}</div>
        </div>
      </div>
    );
  }

  componentWillMount = () => {
    Axios.get("http://localhost:3001/messages/").then(res => {
      console.log(res.data);
      this.setState({ messageList: res.data });
    });
    socket.on("Message", mess => {
      //console.log([mess, ...this.state.messageList]);
      this.setState({ messageList: mess });
    });
  };

  render() {
    console.log(this.state);

    return (
      <div>
        <Navbar />
        <div className="main-container">
          {this.state.messageList.map((message, index) => {
            return this.displayMessage(message, index);
          })}
          {/* {this.displayEmergencyMessage({
                    sender: "Accueil",
                    receiver: "IOA",
                    body: "Accident de bus. 33 personnes blessées.",
                    updated_at: Date.now(),
                    status: "urgent"
                })} */}
        </div>
      </div>
    );
  }
}

export default MessageBoard;
