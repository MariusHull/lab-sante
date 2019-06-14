import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./test.css";
import "./imagedicteevocale.jpeg"

const socket = socketIOClient("localhost:3001");

export default class Test extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "localhost:3001",

      ///
      color: "white",
      message: "",
      receiver: "",
      sender: "",
      status: "",
      ///
      messages: [
        {
          body: "Heyyyyy",
          receiver: "Tout le monde",
          sender: "IOA",
          status: "information"
        },
        {
          body: "Heyyyyy2",
          receiver: "Tout le monde",
          sender: "IOA",
          status: "information"
        }
      ]
    };
  }

  componentWillMount = () => {
    const { messages } = this.state;
    socket.on("New message", mess => {
      console.log("Messages : ", mess);
      messages.push(mess);
      this.setState({ messages });
    });
  };

  onChange = e => {
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onChangeStatus = e => {
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state, () => console.log(this.state));
  };

  onSubmit = e => {
    console.log(this.state.status)
    console.log(this.state.receiver)
    console.log(this.state.sender)
    console.log(this.state.message);
    socket.emit(
      "Message IOA",
      this.state.message,
      this.state.receiver,
      this.state.sender,
      this.state.status
    );
    this.setState({
      message: "",
      receiver: "",
      sender:"",
      status:""
    });
  };

  coucou = e => {
    console.log("coucou")
  }

  // adding the function
  setColor = color => {
    this.setState({ color });
  };

  // render method that renders in code if the state is updated
  render() {
    var img = new Image();   // Crée un nouvel élément img
img.src = './images.jpeg';

    const { messages, message } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {/* <button onClick={() => this.send()}>Change Color</button>

        <button id="blue" onClick={() => this.setColor("blue")}>
          Blue
        </button>
        <button id="red" onClick={() => this.setColor("red")}>
          Red
        </button> */}
        {/*messages &&
          messages.map((message, index) => {
            return (
              <div>
                <hb />
                {message.body} DE : {message.sender}, A : {message.receiver},
                STATUS : {message.status}
              </div>
            );
          })*/}
     
        <div className="row" size="1">


        <div className="col" id="colonne1">
        <select 
          name="receiver"
          className="form-control1"
          onChange={this.onChange}
          >
          <option  className="option" value="" selected disabled hidden>Expéditeur?</option>
          <option className="option" value="IAO">IAO</option>
          <option value="Bocal">Bocal</option>
          <option value="Accueil">Accueil</option>
          <option value="Administration">Administration</option>
        </select>
        </div>


        <div className="col" id="colonne2" >
        <select 
          className="form-control2"
          onChange={this.onChange}
          name="sender"
          >
          <option value="" selected disabled hidden>Destinataire?</option>
          <option className="option" value="all">Tous</option>
          <option value="IAO">IAO</option>
          <option value="Bocal">Bocal</option>
          <option value="Accueil">Accueil</option>
          <option value="Administration">Administration</option>
        </select>
        </div>
        </div>

        <div id="colonne3" >
        <button  className="form-control3" onClick={this.coucou} > 
        <img alt='haut-parleur' src="./imagedicteevocale.jpeg" width="25%" height="25%"/>
        </button>
        </div>

        <div className="form-group" id="colonne4">
          <textarea
            name="message"
            type="text"
            className="form-control4"
            aria-describedby="emailHelp"
            value={message}
            onChange={this.onChange}
            placeholder="Message"
          />
          </div>
         <div>
         <div id="colonne5">
          <button className="form-control5" name="status" onClick={this.onChangeStatus} value="important">Important</button>
          </div>
          <div id="colonne6">
          <button className="form-control6" name="status" onClick={this.onChangeStatus} value="urgent">Urgent</button>
          </div>
          <div id="colonne7">
          <button className="form-control7" name="status" onClick={this.onChangeStatus} value="information">Information</button>
          </div>
          </div>
      </div>
    );
  }
}
