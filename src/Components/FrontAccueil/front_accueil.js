import React, { Component } from "react";
import "./front_accueil.css";

export default class FrontAccueil extends Component {
  constructor() {
    super();
    this.state = {
      ordre: [
        {
          name: "A1"
        },
        {
          name: "A2"
        },
        {
          name: "A3"
        },
        {
          name: "A4"
        },
        {
          name: "A5"
        },
        {
          name: "A6"
        },

        {
          name: "A7"
        },

        {
          name: "A8"
        },
        {
          name: "A8"
        },
        {
          name: "A8"
        }
      ]
    };
  }

  //ComponentWillMount = () => {}

  render() {
    return (
      <div>
        <div className="row1accueil">
          <div className="bienvenue">
            <div className="titretext">Bienvenue aux Urgences de Melun</div>
          </div>
        </div>

        <div className="row2accueil">
          <div className="ordrepassage">
            <h2 className="soustitreordre">Ordre de passage </h2>
            {this.state.ordre.slice(0, 1).map(patient => (
              <div className="ordrebox1">
                {" "}
                <div className="textbox">
                  Attendu à l'accueil: {patient.name}{" "}
                </div>
              </div>
            ))}
            {this.state.ordre.slice(1, 8).map(patient => (
              <div className="ordrebox">
                {" "}
                <div className="textbox"> {patient.name} </div>
              </div>
            ))}
          </div>

          <div className="procedures">
            <h2 className="soustitreprocedure">Procédures</h2>
            <div className="textprocedure">
              Veuillez prendre un ticket pour l’ordre de passage près de la
              porte d'entrée. <br />
              Attendez que votre numéro soit appelé pour vous présenter avec:
              <br />
              - Adulte, adolescent: carte d’identité, carte vitale et mutuelle
              du patient
              <br />
              - Enfant : carnet de santé de l’enfant, carte d’identité et
              mutuelle d’un parent
              <br />
              <br />
              Explication des Règles de Priorités
              <br />
              <br />
              1) Pompiers/Policiers/SAMU/Ambulances
              <br />
              2) Maternité/gynécologique
              <br />
              3) Enfant
              <br />
              4) Adulte
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
