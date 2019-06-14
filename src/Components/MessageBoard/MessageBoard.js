import React from "react";
import "./MessageBoard.css";
import * as moment from 'moment';
import 'moment/locale/fr';

class MessageBoard extends React.Component {

    constructor() {
        super()
        moment.locale('fr');
        this.state = {
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

    displayMessage(message) {
        return (
            <div class="message" style={{ borderColor: this.colorFromSender(message.sender) }}>
                <div class="sender-container" style={{ backgroundColor: this.colorFromSender(message.sender) }}>
                    <div class="sender-transparent">
                        <div class="sender-content" style={{ fontWeight: 900, fontSize: 18 }}>{message.sender}</div>
                        <div>{"à " + moment(message.updated_at).format('LT')}</div>
                    </div>
                </div>
                <div class="message-container">
                    <div class="message-content">{message.body}</div>
                </div>
            </div>
        )
    }

    displayEmergencyMessage(message) {
        return (
            <div class="emergency-container">
                <div class="emergency-popup">
                    <div>{message.body}</div>
                </div>
            </div>
        )
    }

    render() {
        console.log(this.state)

        return (
                <div class="main-container">
                    {this.state.messageList.map(message => { return this.displayMessage(message) })}
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