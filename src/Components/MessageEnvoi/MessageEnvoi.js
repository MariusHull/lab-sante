import React, { Component } from "react";
import "./MessageEnvoi.css"

import Axios from "axios";
import { DropdownButton, Dropdown } from "react-bootstrap"

import { url } from '../../config.js';

class MessageEnvoi extends Component {

    constructor() {
        super();
        this.state = {
            services: [],
            sender : null, 
            receiver : null
        };
    }

    componentWillMount = () => {
        Axios.get(`${url}/services/`).then(res => {
            this.setState({ services: res.data });
        });
    };

    changeSender(value){
        this.setState({sender : value})
    }

    changeReceiver(value){
        this.setState({receiver : value})
    }

    render() {
        let services = this.state.services
        return (
            <div id="message-envoi">
                <div id="container-authors">
                    <div id="sender">
                        <DropdownButton size="lg" id="dropdown-sender" title={this.state.sender ? this.state.sender : "Expéditeur "}>
                            {services.map((service, index)=>{
                                return(<Dropdown.Item active={this.state.sender === service.name}key={index} onClick={(e)=>{this.changeSender(service.name)}}>{service.name}</Dropdown.Item>)
                            })}
                        </DropdownButton>
                    </div>
                    <div id="receiver">
                        <DropdownButton size="lg" id="dropdown-receiver" title={this.state.receiver ? this.state.receiver : "Destinataire "}>
                            {services.map((service, index)=>{
                                return(<Dropdown.Item active={this.state.receiver === service.name}key={index} onClick={(e)=>{this.changeReceiver(service.name)}}>{service.name}</Dropdown.Item>)
                            })}
                        </DropdownButton>
                    </div>
                </div>
                <div id="container-message">ligne 2</div>
                <div id="container-buttons">ligne 3</div>

            </div>)
    }
}

export default MessageEnvoi