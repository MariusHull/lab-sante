import React, { Component } from "react";
import axios from "axios";
import { url } from "../../config.js";
import "./TextUser.css";
import { toast } from "react-toastify";

export default class TextUser extends Component {
  constructor() {
    super();
    this.state = {
      number: ""
    };
  }

  componentWillMount() {
    axios.get(`${url}/services/`).then(res => {
      this.setState({ services: res.data });
    });
  }

  subscribe = () => {
    toast.error(`Erreur : Le service de SMS a été désactivé`, {
      position: "top-center",
      autoClose: 20000
    });
    // const { number } = this.state;
    // axios.post(`${url}/phones/subscribe/`, { number: number }).then(res => {
    //   toast.success(
    //     `Vous avez été inscrit. Vous recevrez les messages d'info vous concernant au : ${number}`,
    //     {
    //       position: "top-center",
    //       autoClose: 20000
    //     }
    //   );
    //   this.setState({ number: "" });
    // });
  };

  onChange = e => {
    this.setState({ number: e.target.value });
  };

  render() {
    const { number } = this.state;
    return (
      <div className="container">
        <div className="row1accueil bienvenue titretext">
          Bienvenue aux Urgences de Melun
        </div>
        <div className="">
          <div className="card">
            <h1 className="card-header">Messages d'information</h1>
            <div className="card-body">
              <p>
                Vous pouvez entrer votre numéro pour recevoir des messages
                d'information.
              </p>
              <br />
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Votre numéro :
                  </span>
                </div>
                <input
                  type="text"
                  value={number}
                  className="form-control"
                  placeholder="ex : +33607080910"
                  onChange={this.onChange}
                />
              </div>
              <br />
              <button
                type="button"
                onClick={this.subscribe}
                className="col btn btn-outline-success"
              >
                Tenez-moi informé !
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
