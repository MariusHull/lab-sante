import React from "react";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

import "./MessageBoard.css";
import * as moment from "moment";
import "moment/locale/fr";
import Axios from "axios";
import socketIOClient from "socket.io-client";
import Navbar from "../../Containers/Navbar";
const socket = socketIOClient("localhost:3001");


class MessageBoard extends React.Component {

  constructor() {
    super()
    moment.locale('fr');
    this.state = {
      emergency: null,
      oldMessageIndex: 0,
      numberRows: 6,
      messageList: [
        {
          sender: "IOA",
          receiver: "Bocal",
          body: "Aide demandée au Box 3.",
          updated_at: Date.now(),
          status: "important"
        },
        {
          sender: "Bocal",
          receiver: "IOA",
          body: "Ceci est un test.",
          updated_at: Date.now(),
          status: "urgent"
        },
        {
          sender: "Bocal",
          receiver: "IOA",
          body: "Ceci est un test.",
          updated_at: Date.now(),
          status: "urgent"
        },
        {
          sender: "Accueil",
          receiver: "IOA",
          body: "Malaise jeune fille 12 ans.",
          updated_at: Date.now(),
          status: "urgent"
        },
        {
          sender: "Bocal",
          receiver: "IOA",
          body: "Box 3 libéré.",
          updated_at: Date.now(),
          status: "urgent"
        },
        {
          sender: "Accueil",
          receiver: "IOA",
          body: "Attention : deux frères sont arrivés aux urgences. Ne confondez pas les dossiers.",
          updated_at: Date.now(),
          status: "urgent"
        }
      ]
    }
  };


  colorFromSender(sender) {
    switch (sender) {
      case "IOA":
        return "blue";
      case "Bocal":
        return "green";
      case "Accueil":
        return "orange";
      case "Administration":
        return "#800080";
      default:
        return "pink";
    }
  }

  resizeWindow(){
    let numberRows = Math.trunc((window.innerHeight - 165) / 75);
    this.setState({numberRows : numberRows});
    // console.log("numberRows", numberRows);
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

  displayOldMessages(messages) {
    return (
      <div className="old-messages-container">
        <div class="old-message-title">Anciens messages</div>
        <div class="old-message-count">{this.state.oldMessageIndex + 1}/{messages.length}</div>
        <Slider
          autoplay={10000}
          infinite={true}
          previousButton={null}
          nextButton={null}
          onSlideChange={(event) => { this.setState({ oldMessageIndex: event.slideIndex }) }}>
          {
            messages.map((message, index) => {
              return (
                <div class="old-message">{this.displayMessage(message, index)}</div>
              )
            })
          }
        </Slider>
      </div>
    )
  }

  componentWillMount = () => {
    // Getting all messages
    Axios.get("http://localhost:3001/messages/").then(res => {
      console.log(res.data);
      // + ajouter trier par dates
      this.setState({ messageList: res.data.reverse() });
    });

    // Listening to socket
    socket.on("Message", message => {
      console.log(message);
      // console.log([mess, ...this.state.messageList]);
      // this.setState({ messageList: mess }); que branlo marius ??
      this.setState({ messageList: [message, ...this.state.messageList] });
      if (message.status === "urgent") {
        this.setState({ emergency: message }, () => {
          setTimeout(() => {
            this.setState({ emergency: null });
          }, 5000);
        });
      }
    });
  };


  /**
   * Add event listener
   */
  componentDidMount() {
    this.resizeWindow();
    window.addEventListener("resize", this.resizeWindow.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeWindow.bind(this));
  }

  render() {
    return (
      <div>
        {/* <Navbar /> */}
        <div className="main-container">
          <div className="messages-container">
            {this.state.messageList
              .slice(0, this.state.numberRows)
              .map((message, index) => {
                return this.displayMessage(message, index);
              })}
            {this.state.emergency &&
              this.displayEmergencyMessage(this.state.emergency)}
          </div>
          <div class="old-message-container-position">
            {this.state.messageList.slice(this.state.numberRows).length > 0 && this.displayOldMessages(this.state.messageList.slice(this.state.numberRows))}
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBoard;
