import React, { Component } from "react";
import Navbar from "../../Containers/Navbar";
import "./front_bocal.css";
import socketIOClient from "socket.io-client";
const socket = socketIOClient("localhost:3001");

export default class FrontBocal extends Component {
  constructor() {
    super();
    this.state = {
      nombrepatienturgences: "46",
      nombrepatientIAO: "12",
      nombrepatientmedecin: "25",
      nombrepatientanalyse: "15",

      ordre: [
        {
          name: "Michel",
          attente: "2h",
          statut: "3"
        },
        {
          name: "georges",
          attente: "2h",
          statut: "3"
        },
        {
          name: "georges",
          attente: "2h",
          statut: "3"
        },
        {
          name: "georges",
          attente: "2h",
          statut: "3"
        },
        {
          name: "georges",
          attente: "2h",
          statut: "3"
        },
        {
          name: "Michel",
          attente: "2h",
          statut: "3"
        },
        {
          name: "Michel",
          attente: "2h",
          statut: "3"
        },
        {
          name: "Michel",
          attente: "2h",
          statut: "3"
        },
        {
          name: "Michel",
          attente: "2h",
          statut: "3"
        }
      ],

      numero: [
        {
          nom: "Michel",
          numero: "0688989898"
        },
        {
          nom: "Michel",
          numero: "0688989898"
        },
        {
          nom: "Michel",
          numero: "0688989898"
        },
        {
          nom: "Michel",
          numero: "0688989898"
        },
        {
          nom: "Michel",
          numero: "0688989898"
        },
        {
          nom: "Michel",
          numero: "0688989898"
        },
        {
          nom: "Michel",
          numero: "0688989898"
        }
      ],
      messageList: [
        {
          sender: "IOA",
          receiver: "all",
          body: "Aide demandée au Box 3.",
          updated_at: Date.now(),
          status: "important"
        },
        {
          sender: "Bocal",
          receiver: "IOA",
          body: "Ceci est un test.",
          updated_at: Date.now(),
          status: "important"
        }
      ]
    };
  }

  componentWillMount = () => {
    socket.on("Message", mess => {
      this.setState({ messageList: [mess, ...this.state.messageList] });
      console.log(this.state.messageList);
    });
  };

  render() {
    return (
      <div>
        {/* <Navbar /> */}

        <div className="generalbocal">
          <div className="row1bocal">
            <div className="messagebocal">
              {" "}
              {this.state.messageList
                .filter(item => {
                  return item.receiver == "IOA" || item.receiver == "all";
                })
                .filter(item => {
                  return item.status == "important";
                })
                .slice(0, 1)
                .map(message => (
                  <div className="messagetextbocal">
                    Important : {message.body}
                  </div>
                ))}
            </div>
            <div className="boxalarmbocal"> </div>
          </div>

          <div className="row2bocal">
            <div className="row2col1bocal">
              <div className="row2col1row1bocal">
                <h2>Informations</h2>
                <div className="row2col1row1col1rowbocal">
                  <div className="row2col1row1col1bocal">
                    Nombre de patient dans les urgences:
                  </div>
                  <div className="row2col1row1col2bocal">
                    {this.state.nombrepatienturgences}
                  </div>
                </div>
                <div className="row2col1row1col1rowbocal">
                  <div className="row2col1row1col1bocal">
                    Nombre de patient en attente d'bocal:
                  </div>
                  <div className="row2col1row1col2bocal">
                    {this.state.nombrepatientbocal}
                  </div>
                </div>
                <div className="row2col1row1col1rowbocal">
                  <div className="row2col1row1col1bocal">
                    Nombre de patient en attente de box :
                  </div>
                  <div className="row2col1row1col2bocal">
                    {this.state.nombrepatientmedecin}
                  </div>
                </div>
                <div className="row2col1row1col1rowbocal">
                  <div className="row2col1row1col1bocal">
                    Nombre de patient en attente d'analyses:
                  </div>
                  <div className="row2col1row1col2bocal">
                    {this.state.nombrepatientanalyse}
                  </div>
                </div>
              </div>
              <div className="row2col1row2bocal">
                <h2>Tableau des attentes</h2>

                <div className="rowtabbocal">
                  <div className="nompatientbocal"> Nom du patient </div>
                  <div className="attentepatientbocal">
                    {" "}
                    Attente du patient{" "}
                  </div>
                  <div className="statutpatientbocal"> Statut du Patient </div>
                </div>
                {this.state.ordre.slice(0, 5).map(patient => (
                  <div className="rowtabbocal">
                    <div className="nompatientbocal"> {patient.name}</div>
                    <div className="attentepatientbocal">{patient.attente}</div>
                    <div className="statutpatientbocal">{patient.statut}</div>
                  </div>
                ))}
              </div>

              <div className="row2col1row3bocal">
                <h2>Numéros importants</h2>
                <div className="row2col1row35bocal">
                  <div className="row2col1row3col1bocal">
                    {this.state.numero.slice(0, 5).map(numero => (
                      <div className="rowtabnumerobocal">
                        <div className="nomnumerobocal">{numero.nom}</div>
                        <div className="numerobocal">{numero.numero}</div>
                      </div>
                    ))}
                  </div>
                  <div className="row2col1row3col2bocal">
                    {this.state.numero.slice(0, 5).map(numero => (
                      <div className="rowtabnumerobocal">
                        <div className="nomnumerobocal">{numero.nom}</div>
                        <div className="numerobocal">{numero.numero}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="row2col2bocal">
              <div className="statutbox">
                <h2 className="titrestatutbocal"> Tableau des statuts</h2>
                <div className="tableaugeneralbocal">
                  <div className="rowtabbocalstatut">
                    <div className="tableaustatut"> Nom du patient </div>
                    <div className="tableaustatut"> Statut Radiologie </div>
                    <div className="tableaustatut"> Statut Laboratoire </div>
                    <div className="tableaustatut"> Attente du patient </div>
                  </div>
                  {this.state.ordre.slice(0, 10).map(patient => (
                    <div className="rowtabbocalstatut">
                      <div className="tableaustatut"> {patient.name}</div>
                      <div className="tableaustatut">{patient.attente}</div>
                      <div className="tableaustatut">{patient.statut}</div>
                      <div className="tableaustatut">{patient.statut}</div>
                    </div>
                  ))}{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
