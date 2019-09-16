import React, { Component } from "react";
import axios from "axios";
import { url } from "../../config.js";
import "./Service.css";

class Service extends Component {
  constructor() {
    super();
    this.state = {
      savedServices: [],
      colors: [
        "#ffcb83",
        "#cc66ff",
        "#6d7eff",
        "#7fb678",
        "#ff817a",
        "#996633",
        "#666699"
      ],
      newName: "",
      newColor: "#000000"
    };
  }

  componentWillMount() {
    this.reload();
  }

  reload = () => {
    axios.get(`${url}/services/`).then(res => {
      this.setState({ savedServices: res.data });
    });
  };

  onChange = e => {
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  delete = service => {
    if (
      !window.confirm(
        "Etes-vous sûr de vouloir supprimer ce service ? Cette action est irréversible!"
      )
    ) {
      return 1;
    }
    axios.delete(`${url}/services/${service._id}`, service).then(res => {
      this.reload();
    });
  };

  onSubmit = () => {
    const { newColor, newName } = this.state;
    if (newName === "") {
      window.alert("Veuillez donner un nom au nouveau service");
      return 0;
    }
    axios
      .post(`${url}/services/`, {
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
                  <div>{service.name} </div>
                  <div>
                    <span
                      className="badge badge-service"
                      style={{
                        backgroundColor: service.color
                      }}
                    >
                      {" "}
                      &nbsp;
                    </span>

                    <button
                      type="button"
                      className="btn btn-outline-danger delete-button"
                      onClick={() => this.delete(service)}
                    >
                      <i class="fas fa-times" />
                    </button>
                  </div>
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
        <div className="container">
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
      </div>
    );
  }
}

export default Service;
