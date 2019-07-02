import React, { Component } from "react";
import "./MessageEnvoi.css"
import socketIOClient from "socket.io-client";
import Axios from "axios";
import { DropdownButton, Dropdown, Form, ButtonToolbar, Button, Modal } from "react-bootstrap"
import { url } from '../../config.js';
const socket = socketIOClient(url);

class MessageEnvoi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            services: [],
            supportVoice: "webkitSpeechRecognition" in window || "mozSpeechRecognition" in window || "msSpeechRecognition" in window || 'SpeechRecognition' in window,
            placeholder: "Ecrire un message...",
            recording: false,
            sender: null,
            receiver: "",
            message: ""
        };
    }

    componentWillMount = () => {
        Axios.get(`${url}/services/`).then(res => {
            this.setState({ services: res.data });
        });
        if (this.state.supportVoice) {
            this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
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
                            message: finalTranscript
                        });
                        if (this.props.onChange) this.props.onChange(finalTranscript);
                        if (this.props.onEnd) this.props.onEnd(finalTranscript);
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                        this.setState({
                            message: interimTranscript
                        });
                        if (this.props.onChange) this.props.onChange(interimTranscript);
                    }
                }
            };
        }
    }

    componentDidMount() {
        if (this.props.loginService) {
            this.setState({ sender: this.props.loginService })
        }
    }

    changeSender = (value) => {
        // this.setState({ sender: value })
        this.setState({modalService: value})
        // this.props.changeLoginService(value)
        // this.props.history.push(value)
    }

    changeReceiver(value) {
        this.setState({ receiver: value })
    }

    changeMessage(value) {
        this.setState({ message: value })
    }

    sendMessage(status) {
        let messageObject = {
            sender: this.state.sender,
            receiver: this.state.receiver,
            body: this.state.message,
            updated_at: Date.now(),
            status: status,
            outdated: false
        }
        console.log(messageObject)
        socket.emit("Message", messageObject);
        this.setState({
            message: ""
        });
    };

    onTouchStartMic() {
        console.log(this.state.recording)
        if (!this.state.recording) {
            this.setState({ recording: true, placeholder: "Enregistrement en cours..." }, () => {
                if (this.state.supportVoice) {
                    this.recognition.start();
                    console.log("start")
                }
            });
        }
    }

    onTouchEndMic() {
        console.log(this.state.recording)
        if (this.state.recording) {
            this.setState({ recording: false, placeholder: "Ecrire un message..." }, () => {
                if (this.state.supportVoice) {
                    this.recognition.stop();
                }
            });
        }
    }

    connectService(){
        this.props.changeLoginService(this.state.modalService)
    }

    showModal() {
        return (
            <Modal
                show={this.state.modalService}
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Authentification : {this.state.modalService}
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Entrez votre mot de passe</h5>
                    <input class="form-control" type="password" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => this.connectService()}>Connexion</Button>
                    <Button variant="danger" onClick={()=>this.setState({modalService: null})}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    render() {
        let services = this.state.services
        return (
            <div id="message-envoi">
                {this.showModal()}
                <div id="container-authors">
                    <div id="sender">
                        <DropdownButton size="lg" id="dropdown-sender" title={this.state.sender ? this.state.sender === 'all' ? "Tous" : this.state.sender : "Expéditeur "}>
                            {services.map((service, index) => {
                                return (<div key={index}><Dropdown.Item active={this.state.sender === service.name} onClick={(e) => { this.changeSender(service.name) }}>{service.name}</Dropdown.Item></div>)
                            })}
                        </DropdownButton>
                    </div>
                    <div id="receiver">
                        <DropdownButton size="lg" id="dropdown-receiver" title={this.state.receiver ? this.state.receiver === 'all' ? "Tous" : this.state.receiver : "Destinataire"}>
                            <Dropdown.Item active={this.state.receiver === 'all'} onClick={(e) => { this.changeReceiver('all') }}>Tous</Dropdown.Item>
                            {services.map((service, index) => {
                                return (<div key={index}><Dropdown.Item active={this.state.receiver === service.name} onClick={(e) => { this.changeReceiver(service.name) }}>{service.name}</Dropdown.Item></div>)
                            })}
                        </DropdownButton>
                    </div>
                </div>
                <div id="container-message">
                    <div id="microphone">
                        <div id="icon-microphone" className={this.state.recording ? "icon-microphone-on" : "icon-microphone-off"} onTouchStart={this.onTouchStartMic.bind(this)} onTouchEnd={this.onTouchEndMic.bind(this)}><i className="fas fa-microphone"></i></div>
                    </div>
                    <Form id="message-area">
                        <Form.Control className="text-area-message" placeholder={this.state.placeholder} as="textarea" value={this.state.message} onChange={e => this.changeMessage(e.target.value)} />
                    </Form>
                </div>
                <div id="container-buttons">
                    <ButtonToolbar id="button-toolbar">
                        <Button className="button-envoi" variant="primary" disabled={(!this.state.sender || this.state.sender.length == 0) || (!this.state.receiver || this.state.receiver.length == 0)} onClick={() => this.sendMessage("important")}>
                            <i className="fas fa-exclamation-triangle"></i><div className="status">Important</div></Button>
                        <Button className="button-envoi" variant="success" disabled={(!this.state.sender || this.state.sender.length == 0) || (!this.state.receiver || this.state.receiver.length == 0)} onClick={() => this.sendMessage("information")}>
                            <i className="fas fa-info-circle"></i><div className="status">Information</div></Button>
                        <Button className="button-envoi" variant="danger" disabled={(!this.state.sender || this.state.sender.length == 0) || (!this.state.receiver || this.state.receiver.length == 0)} onClick={() => this.sendMessage("urgent")}>
                            <i className="fas fa-ambulance"></i><div className="status">Urgent</div></Button>
                    </ButtonToolbar>
                </div>

            </div >)
    }
}

export default MessageEnvoi