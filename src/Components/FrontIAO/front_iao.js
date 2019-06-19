import React, { Component } from "react";
import Navbar from "../../Containers/Navbar";
import "./front_iao.css";
import socketIOClient from "socket.io-client";
const socket = socketIOClient("localhost:3001");

export default class FrontIAO extends Component {
  constructor() {
    super();
    this.state = {
      nombrepatienturgences: "46",
      nombrepatientIAO: "12",
      nombrepatientmedecin: "25",
      nombrepatientanalyse: "15",

      ordre: [
        {
          name: "Michel Dupont",
          attente: "2h",
          statut: "3"
        },
        {
          name: "georges Dupont",
          attente: "2h",
          statut: "3"
        },
        {
          name: "georges Dupont",
          attente: "2h",
          statut: "3"
        },
        {
          name: "georges Dupont",
          attente: "2h",
          statut: "3"
        },
        {
          name: "georges Dupont ",
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
    const { nombrepatienturgences } = this.state;
    return (
      <div>
        {/* <Navbar /> */}
        <div className="generaliao">
          <div className="row1iao">
            <div className="messageiao">
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
                  <div className="messagetextiao">
                    Important : {message.body}
                  </div>
                ))}
            </div>
            <div
              className={`boxalarmiao ${
                nombrepatienturgences && nombrepatienturgences > 60
                  ? "red"
                  : nombrepatienturgences < 30
                  ? "green"
                  : "orange"
              }`}
            >
              {" "}
            </div>
          </div>

          <div className="row2iao">
            <div className="row2col1iao">
              <div className="row2col1row1iao">
                <h2>Informations</h2>
                <div className="row2col1row1col1rowiao">
                  <div className="row2col1row1col1iao">
                    Nombre de patient dans les urgences:
                  </div>
                  <div className="row2col1row1col2iao">
                    {this.state.nombrepatienturgences}
                  </div>
                </div>
                <div className="row2col1row1col1rowiao">
                  <div className="row2col1row1col1iao">
                    Nombre de patient en attente d'IAO:
                  </div>
                  <div className="row2col1row1col2iao">
                    {this.state.nombrepatientIAO}
                  </div>
                </div>
                <div className="row2col1row1col1rowiao">
                  <div className="row2col1row1col1iao">
                    Nombre de patient en attente de box :
                  </div>
                  <div className="row2col1row1col2iao">
                    {this.state.nombrepatientmedecin}
                  </div>
                </div>
                <div className="row2col1row1col1rowiao">
                  <div className="row2col1row1col1iao">
                    Nombre de patient en attente d'analyses:
                  </div>
                  <div className="row2col1row1col2iao">
                    {this.state.nombrepatientanalyse}
                  </div>
                </div>
              </div>
              <div className="row2col1row2iao">
                <h2>Tableau des attentes</h2>

                <div className="rowtabiao">
                  <div className="nompatientiao"> Nom du patient </div>
                  <div className="attentepatientiao"> Attente</div>
                  <div className="statutpatientiao"> Statut </div>
                </div>
                {this.state.ordre.slice(0, 5).map(patient => (
                  <div className="rowtabiao">
                    <div className="nompatientiao"> {patient.name}</div>
                    <div className="attentepatientiao">{patient.attente}</div>
                    <div className="statutpatientiao">{patient.statut}</div>
                  </div>
                ))}
              </div>

              <div className="row2col1row3iao">
                <h2>Numéros importants</h2>
                <div className="row2col1row35iao">
                  <div className="row2col1row3col1iao">
                    {this.state.numero.slice(0, 5).map(numero => (
                      <div className="rowtabnumeroiao">
                        <div className="nomnumeroiao">{numero.nom}</div>
                        <div className="numeroiao">{numero.numero}</div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
            <div className="row2col2iao">
              <div className="cameraboxiao"> Caméra de surveillance </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
