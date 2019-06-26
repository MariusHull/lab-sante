import React, { Component } from "react";
import "./MessageEnvoi.css"
import Axios from "axios";
import { DropdownButton, Dropdown, Form } from "react-bootstrap"
import { url } from '../../config.js';

class MessageEnvoi extends Component {

    constructor() {
        super();
        this.state = {
            services: [],
            supportVoice: 'SpeechRecognition' in window || "webkitSpeechRecognition" in window || "mozSpeechRecognition" in window || "msSpeechRecognition" in window,
            placeholder : "Ecrire un message...",
            recording: false,
            sender: null,
            receiver: null,
            message: null
        };
    }

    componentWillMount = () => {
        Axios.get(`${url}/services/`).then(res => {
            this.setState({ services: res.data });
        });
    };

    componentDidMount() {
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

    changeSender(value) {
        this.setState({ sender: value })
    }

    changeReceiver(value) {
        this.setState({ receiver: value })
    }
    
    changeMessage(value){
        this.setState({ message: value })
    }
    
    onTouchStartMic(){
        if(!this.state.recording){
            this.setState({recording: true, placeholder: "Enregistrement en cours..."}, ()=>{
                if (this.state.supportVoice) {
                    this.recognition.start()
                }
                else{
                    alert("Probleme start")
                }
            })  
        }  
    }

    onTouchEndMic(){
        if(this.state.recording){
            this.setState({recording: false, placeholder: "Ecrire un message..."}, ()=>{
                if (this.state.supportVoice) {
                    this.recognition.stop()
                }
                else{
                    alert(this.state.supportVoice)
                }
            })
        }
    }

    render() {
        let services = this.state.services
        return (
            <div id="message-envoi">
                <div id="container-authors">
                    <div id="sender">
                        <DropdownButton size="lg" id="dropdown-sender" title={this.state.sender ? this.state.sender : "Expéditeur "}>
                            {services.map((service, index) => {
                                return (<Dropdown.Item active={this.state.sender === service.name} key={index} onClick={(e) => { this.changeSender(service.name) }}>{service.name}</Dropdown.Item>)
                            })}
                        </DropdownButton>
                    </div>
                    <div id="receiver">
                        <DropdownButton size="lg" id="dropdown-receiver" title={this.state.receiver ? this.state.receiver : "Destinataire "}>
                            {services.map((service, index) => {
                                return (<Dropdown.Item active={this.state.receiver === service.name} key={index} onClick={(e) => { this.changeReceiver(service.name) }}>{service.name}</Dropdown.Item>)
                            })}
                        </DropdownButton>
                    </div>
                </div>
                <div id="container-message">
                    <div id="microphone">
                        <div id="icon-microphone" className={this.state.recording ? "icon-microphone-on" : "icon-microphone-off"}onTouchStart={this.onTouchStartMic.bind(this)} onTouchEnd={this.onTouchEndMic.bind(this)}><i class="fas fa-microphone"></i></div> 
                    </div>
                    <Form id="message-area">
                        <Form.Control className="text-area-message" placeholder={this.state.placeholder} as="textarea"  value={this.state.message} onChange={e=>this.changeMessage(e.target.value)}/>
                    </Form>
                </div>
                <div id="container-buttons">ligne 3</div>

            </div >)
    }
}

export default MessageEnvoi