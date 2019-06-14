import React from "react";
import "./MessageBoard.css";
import * as moment from 'moment';
import 'moment/locale/fr';
import socketIOClient from "socket.io-client";
const socket = socketIOClient("localhost:3001");

class MessageBoard extends React.Component {

    constructor() {
        super()
        moment.locale('fr');
        this.state = {
            messages: [],
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
    }

    colorFromSender(sender) {
        switch (sender) {
            case "IOA":
                return "blue"
            case "Bocal":
                return "green"
            case "Accueil":
                return "orange"
            default:
                return "red"
        }
    }

    displayMessage(message, index) {
        return (
            <div className="message" key={index} style={{ borderColor: this.colorFromSender(message.sender) }}>
                <div className="sender-container" style={{ backgroundColor: this.colorFromSender(message.sender) }}>
                    <div className="sender-transparent">
                        <div className="sender-content" style={{ fontWeight: 900, fontSize: 18 }}>{message.sender}</div>
                        <div>{"à " + moment(message.updated_at).format('LT')}</div>
                    </div>
                </div>
                <div className="message-container">
                    <div className="message-content">{message.body}</div>
                </div>
            </div>
        )
    }

    displayEmergencyMessage(message) {
        return (
            <div className="emergency-container">
                <div className="emergency-popup">
                    <div>{message.body}</div>
                </div>
            </div>
        )
    }

    componentWillMount = () => {
        const { messages } = this.state;
        socket.on("Message", mess => {
          console.log("Messages : ", mess);
          messages.push(mess);
          this.setState({ messages }, ()=>{
              console.log(messages)
          });
        });
      };

    render() {
        console.log(this.state)

        return (
                <div className="main-container">
                    {this.state.messageList.map((message, index) => { return this.displayMessage(message, index) })}
                    {/* {this.displayEmergencyMessage({
                    sender: "Accueil",
                    receiver: "IOA",
                    body: "Accident de bus. 33 personnes blessées.",
                    updated_at: Date.now(),
                    status: "urgent"
                })} */}
                </div>
        )
    }

}

export default MessageBoard