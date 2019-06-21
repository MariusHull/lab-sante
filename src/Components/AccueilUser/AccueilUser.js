import React, { Component } from "react";
import axios from "axios";
import { url } from '../../config.js';
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
              <div className="col-4 col-services">
                <div className="card">
                  <div
                    className="card-header"
                    style={{ backgroundColor: service.color }}
                  >
                    {service.name}
                  </div>
                  <div className="card-body card-service">
                    <div className="row row-service">
                      <div className="col col-service">
                        <Link to={`/board/${service.name}`} className="link-service">
                          Messages reçus
                        </Link>
                      </div>
                      <div className="col col-service">
                        <Link to={`/message/${service.name}`} className="link-service">
                          Écrire un message
                        </Link>
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
      <div>
        <div className="row1accueil bienvenue titretext">
          Bienvenue aux Urgences de Melun
        </div>
        <div className="container">
          <div className="card">
            <h5 className="card-header">Sélectionnez votre service :</h5>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
