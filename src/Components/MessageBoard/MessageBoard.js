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
        super()
        moment.locale('fr');
        this.state = {
            emergency: null,
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
                return "blue"
            case "Bocal":
                return "green"
            case "Accueil":
                return "orange"
            case "Administration":
                return "#800080"
            default:
                return "pink"
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

    displayOldMessages(messages) {
        return (
            <div className="old-messages-container">Caca</div>
        )
    }

    componentWillMount = () => {

        // Getting all messages
        Axios.get("http://localhost:3001/messages/").then(res => {
            console.log(res.data);
            // + ajouter trier par dates
            this.setState({ messageList: res.data });
        });

        // Listening to socket
        socket.on("Message", message => {
            console.log(message)
            // console.log([mess, ...this.state.messageList]);
            // this.setState({ messageList: mess }); que branlo marius ??
            this.setState({ messageList: [message, ...this.state.messageList] })
            if (message.status === 'urgent') {
                this.setState({ emergency: message }, () => {
                    setTimeout(() => {
                        this.setState({ emergency: null })
                    }, 2000);
                })
            }
        });
    };

    render() {
        return (
            <div>
                <Navbar />
                <div className="main-container">
                    <div className="messages-container">
                        {this.state.messageList.slice(0, this.state.numberRows).map((message, index) => { return this.displayMessage(message, index) })}
                        {this.state.emergency && this.displayEmergencyMessage(this.state.emergency)}
                    </div>
                    {this.displayOldMessages()}
                </div>
            </div>

        )
    }
}

export default MessageBoard;
