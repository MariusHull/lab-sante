import React, { Component } from "react";
import axios from "axios";
import { url } from "../../config.js";
import { Link } from "react-router-dom";
import "./AccueilUser.css";

export default class AccueilUser extends Component {
  constructor() {
    super();
    this.state = {
      services: []
    };
  }

  componentWillMount() {
    axios.get(`${url}/services/`).then(res => {
      this.setState({ services: res.data });
    });
  }

  getRoutes = () => {
    const { services } = this.state;
    return (
      <div className="row">
        {services &&
          services.map((service, index) => {
            return (
              <div className="col col-services">
                <div className="contain-card">
                  <div className="card" style={{ borderColor: service.color }}>
                    <div
                      className="card-header"
                      style={{ backgroundColor: service.color }}
                    >
                      {service.name}
                    </div>
                    <div className="card-body card-service">
                      <div className="row row-service">
                        <div className="col col-service">
                          <Link
                            to={`/board/${service.name}`}
                            className="link-service"
                          >
                            <i class="fas fa-inbox" /> Messages reçus
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  // <Link
  //               className="col-6 col-services"
  //               to={`/board/${service.name}`}
  //             >
  //               <button
  //                 type="button"
  //                 className="btn btn-primary service-button"
  //                 key={index}
  //               >
  //                 {service.name}
  //               </button>
  //             </Link>

  render() {
    return (
      <div className="container">
        <div className="row1accueil bienvenue titretext">
          Bienvenue aux Urgences de Melun
        </div>
        <div className="">
          <div className="card">
            <h4 className="card-header">Sélectionnez votre service :</h4>
            <div className="card-body">
              {this.getRoutes()}
              <br />
              <button
                type="button"
                onClick={() => this.props.history.push("/service")}
                className="col btn btn-outline-success"
              >
                Ajouter un service &nbsp; <i class="fas fa-plus" />
              </button>
              <br />
              <button
                type="button"
                onClick={() => this.props.history.push("/messageService")}
                className="col btn btn-outline-info"
              >
                Envoyer un message de service &nbsp;{" "}
                <i class="far fa-envelope" />
              </button>
              <br />
              <button
                type="button"
                onClick={() => this.props.history.push("/textregister")}
                className="col btn btn-outline-info"
              >
                Ajouter un numéro &nbsp; <i class="fas fa-mobile-alt" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
