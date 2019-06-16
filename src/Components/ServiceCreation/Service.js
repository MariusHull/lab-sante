import React, { Component } from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";
import "./Service.css";

class Service extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "localhost:3001",
      savedServices: [],
      colors: ["#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff"],
      newName: "",
      newColor: "#000000"
    };
  }

  componentWillMount() {
    this.reload();
  }

  reload = () => {
    axios.get("http://localhost:3001/services/").then(res => {
      this.setState({ savedServices: res.data });
    });
  };

  onChange = e => {
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = () => {
    const { newColor, newName } = this.state;
    if (newName === "") {
      window.alert("Veuillez donner un nom au nouveau service");
      return 0;
    }
    axios
      .post("http://localhost:3001/services/", {
        name: newName,
        color: newColor
      })
      .then(res => {
        this.setState({ newColor: "#000000", newName: "" });
        this.reload();
      });
  };

  getColors = () => {
    const { colors, newColor } = this.state;
    return (
      <div className="row">
        {colors &&
          colors.map((color, index) => {
            return (
              <div
                className={`col ${
                  newColor === color ? "selected" : "not-selected"
                }`}
                onClick={() => this.setState({ newColor: color })}
                key={index}
                style={{
                  backgroundColor: color
                }}
              />
            );
          })}
      </div>
    );
  };

  getServices = () => {
    const { savedServices } = this.state;
    return (
      <div className="card">
        <h5 className="card-header">Services enregistrés </h5>
        <ul className="list-group list-group-flush">
          {savedServices &&
            savedServices.map((service, count) => {
              return (
                <li key={count} className="list-group-item single-service">
                  {service.name} (couleur : &nbsp;
                  <span
                    className="badge badge-service"
                    style={{
                      backgroundColor: service.color
                    }}
                  >
                    &nbsp;
                  </span>
                  )
                </li>
              );
            })}
        </ul>
      </div>
    );
  };

  // render method that renders in code if the state is updated
  render() {
    const { newName } = this.state;
    return (
      <div>
        Hello !
        <br />
        {this.getServices()}
        <br />
        <div className="card">
          <h5 className="card-header">Enregistrer un nouveau service :</h5>
          <div className="card-body">
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Nom du service :
                </span>
              </div>
              <input
                type="text"
                value={newName}
                name="newName"
                className="form-control"
                placeholder="Nom du service"
                onChange={this.onChange}
              />
            </div>
            {this.getColors()}
            <br />
            <button
              type="button"
              onClick={this.onSubmit}
              className="col btn btn-outline-success"
            >
              Ajouter ce service !{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Service;
