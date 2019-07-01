import React from "react";
import Swipeout from "rc-swipeout";
import "rc-swipeout/assets/index.css";
// import 'rc-swipeout/assets/index'
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import sync from "css-animation-sync";
import { url } from "../../config.js";
import "./MessageBoard.css";
import * as moment from "moment";
import "moment/locale/fr";
import Axios from "axios";
import socketIOClient from "socket.io-client";
const socket = socketIOClient(url);

class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    new sync("BlinkAnimation");
    moment.locale("fr");
    this.state = {
      emergency: null,
      oldMessageIndex: 0,
      numberRows: 10,
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
          body:
            "Attention : deux frères sont arrivés aux urgences. Ne confondez pas les dossiers.",
          updated_at: Date.now(),
          status: "urgent"
        }
      ]
    };
  }

  resizeWindow() {
    let numberRows = Math.trunc((window.innerHeight - 165) / 75);
    this.setState({ numberRows: numberRows });
  }

  displayMessage(message, index) {
    const color = message.color || "#DDDDDD";
    return (
      <div className="message" key={index} style={{ borderColor: color }}>
        <div className="sender-container" style={{ backgroundColor: color }}>
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
          {this.displayStatus(message.status)}
        </div>
      </div>
    );
  }

  takeCare = () => {
    console.log("done!");
    if (this.props.loginService === "") return 1;
    socket.emit("TakeCare", {
      carer: this.props.loginService
    });
  };

  displayMessageSwipe(message, index) {
    return (
      <Swipeout
        style={{
          marginTop: "10px",
          borderRadius: "10px"
        }}
        right={[
          {
            text: "Je m'en occupe !",
            onPress: () => {
              alert(
                "C'est noté. Le service '" + message.sender + "' vous remercie."
              );
              this.takeCare();
            },
            className: "right-button-swipe-message"
          }
        ]}
        onOpen={() => {}}
        onClose={() => {}}
        autoClose
      >
        {this.displayMessage(message, index)}
      </Swipeout>
    );
  }

  displayStatus(status) {
    let logo = "";
    let cssClass;

    switch (status) {
      case "information":
        logo = "fas fa-info-circle";
        cssClass = "information-status";
        break;
      case "urgent":
        logo = "fas fa-ambulance";
        cssClass = "emergency-status-blink";
        break;
      case "important":
        logo = "fas fa-exclamation-triangle";
        cssClass = "important-status";
        break;
      default:
        logo = "";
        cssClass = "";
    }
    return (
      <div className={"message-status " + cssClass}>
        <i className={logo} style={{ fontSize: "200%" }} />
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
        <div className="old-message-title">Anciens messages</div>
        <div className="old-message-count">
          {this.state.oldMessageIndex + 1}/{messages.length}
        </div>
        <Slider
          autoplay={10000}
          infinite={true}
          previousButton={null}
          nextButton={null}
          onSlideChange={event => {
            this.setState({ oldMessageIndex: event.slideIndex });
          }}
        >
          {messages.map((message, index) => {
            return <div key={index}>{this.displayMessage(message, index)}</div>;
          })}
        </Slider>
      </div>
    );
  }

  componentWillMount = () => {
    const { messageList } = this.state;
    let serviceName = this.props.loginService;
    console.log(serviceName);
    // Getting all messages
    // const serviceName = this.props.location.pathname.split("/")[
    //   this.props.location.pathname.split("/").length - 1
    // ];
    // this.setState({
    //   serviceName: serviceName
    // });
    Axios.get(`${url}/messages/byreceiver/${serviceName}`).then(res => {
      console.log(res.data);
      // + ajouter trier par dates
      this.setState({ messageList: res.data.reverse() });
    });

    // Listening to socket
    socket
      .on("Message", message => {
        console.log(message);
        if (message.receiver === serviceName || message.receiver === "all") {
          this.setState({ messageList: [message, ...this.state.messageList] });
          if (message.status === "urgent") {
            this.setState({ emergency: message }, () => {
              setTimeout(() => {
                this.setState({ emergency: null });
              }, 5000);
            });
          }
        }
      })
      .on("Outdate", message => {
        Axios.get(`${url}/messages/byreceiver/${serviceName}`).then(res => {
          console.log("Message effacé !", res.data);
          this.setState({ messageList: res.data.reverse() });
        });
        // console.log(
        //   "message",
        //   message,
        //   "outdated : ",
        //   messageList.filter(mess => mess._id === message._id)
        // );
        // if (messageList.filter(mess => mess._id === message._id).length > 0) {
        //   console.log(
        //     "outdated2 : ",
        //     messageList.filter(mess => mess._id !== message._id)
        //   );
        //   this.setState({
        //     messageList: messageList.filter(mess => mess._id !== message._id)
        //   });
        // }
      });
  };

  /**
   * Add event listener
   */
  componentDidMount() {
    this.resizeWindow();
    if (!this.props.canScroll) {
      window.addEventListener("resize", this.resizeWindow.bind(this));
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    if (!this.props.canScroll) {
      window.removeEventListener("resize", this.resizeWindow.bind(this));
    }
  }

  render() {
    return (
      <div className="main-container">
        {this.props.canScroll ? (
          <div id="navbar-board">
            Messages reçus | {this.props.loginService}
          </div>
        ) : (
          <div />
        )}
        <div className="messages-container scroll-device">
          {this.state.messageList
            .slice(
              0,
              this.props.canScroll
                ? this.state.messageList.length
                : this.state.numberRows
            )
            .map((message, index) => {
              return this.displayMessageSwipe(message, index);
            })}
          {this.state.emergency &&
            !this.props.canScroll &&
            this.displayEmergencyMessage(this.state.emergency)}
        </div>
        <div className="old-message-container-position">
          {!this.props.canScroll &&
            this.state.messageList.slice(this.state.numberRows).length > 0 &&
            this.displayOldMessages(
              this.state.messageList.slice(this.state.numberRows)
            )}
        </div>
      </div>
    );
  }
}

export default MessageBoard;
