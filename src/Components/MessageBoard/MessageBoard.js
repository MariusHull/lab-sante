import React from "react";
import "./MessageBoard.css";

class MessageBoard extends React.Component {

    constructor() {
        super()
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
                        <div class="sender-content">{message.sender}</div>
                    </div>
                </div>
                <div class="message-content">
                    {message.body}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div class="main-container">
                {this.displayMessage({
                    sender: "IOA",
                    receiver: "Bocal",
                    body: "Aide demandée au Box 3.",
                    updated_at: Date.now(),
                    status: "important"
                })}
                {this.displayMessage({
                    sender: "Bocal",
                    receiver: "IOA",
                    body: "Ceci est un test.",
                    updated_at: Date.now(),
                    status: "urgent"
                })}
                {this.displayMessage({
                    sender: "Cadres Sup",
                    receiver: "IOA",
                    body: "Ceci est un test.",
                    updated_at: Date.now(),
                    status: "urgent"
                })}
                {this.displayMessage({
                    sender: "Accueil",
                    receiver: "IOA",
                    body: "Malaise jeune fille 12 ans.",
                    updated_at: Date.now(),
                    status: "urgent"
                })}
                {this.displayMessage({
                    sender: "Bocal",
                    receiver: "IOA",
                    body: "Box 3 libéré.",
                    updated_at: Date.now(),
                    status: "urgent"
                })}
                {this.displayMessage({
                    sender: "Accueil",
                    receiver: "IOA",
                    body: "Attention : deux frères sont arrivés aux urgences. Ne confondez pas les dossiers.",
                    updated_at: Date.now(),
                    status: "urgent"
                })}
            </div>
        )
    }

}

export default MessageBoard