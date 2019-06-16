import React, { Component } from "react";
import "./front_iao.css";


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
            ]

        }
    }

    render() {
        return (
            <div className="generaliao">
                <div className="row1iao">
                    <div className="messageiao"> Blabla</div>
                    <div className="boxalarm"> </div>
                </div>

                <div className="row2iao">
                    <div className="row2col1iao">

                        <div className="row2col1row1iao">
                            <h2>Informations</h2>
                            <div className="row2col1row1col1rowiao">
                            <div className="row2col1row1col1iao">Nombre de patient dans les urgences:</div>
                            <div className="row2col1row1col2iao">{this.state.nombrepatienturgences}</div>
                            </div>
                            <div className="row2col1row1col1rowiao">
                            <div className="row2col1row1col1iao">Nombre de patient en attente d'IAO:</div>
                            <div className="row2col1row1col2iao">{this.state.nombrepatientIAO}</div>
                            </div>
                            <div className="row2col1row1col1rowiao">
                            <div className="row2col1row1col1iao">Nombre de patient en attente de box :</div>
                            <div className="row2col1row1col2iao">{this.state.nombrepatientmedecin}</div>
                            </div>
                            <div className="row2col1row1col1rowiao">
                            <div className="row2col1row1col1iao">Nombre de patient en attente d'analyses:</div>
                            <div className="row2col1row1col2iao">{this.state.nombrepatientanalyse}</div>
                            </div>
                       

                        </div>
                        <div className="row2col1row2iao">
                            <h2>Tableau des attentes</h2>

                            <div className="rowtabiao">

                                <div className="nompatient"> Nom du patient </div>
                                <div className="attentepatient"> Attente du patient </div>
                                <div className="statutpatient"> Statut du Patient </div>
                            </div>
                            {this.state.ordre.slice(0, 5).map(patient =>
                                <div className="rowtabiao">
                                    <div className="nompatient"> {patient.name}</div>
                                    <div className="attentepatient">{patient.attente}</div>
                                    <div className="statutpatient">{patient.statut}</div>
                                </div>
                            )}



                        </div>


                        <div className="row2col1row3iao">
                            <h2>Numéros importants</h2>
                            <div className="row2col1row35iao">
                            <div className="row2col1row3col1iao">
                            {this.state.numero.slice(0, 5).map(numero =>
                                <div className='rowtabnumeroiao'>
                                    <div className="nomnumeroiao">{numero.nom}</div>
                                    <div className="numeroiao">{numero.numero}</div>
                                </div>
                            )}
                            </div>
                            <div className="row2col1row3col2iao">

                            {this.state.numero.slice(0, 5).map(numero =>
                                <div className='rowtabnumeroiao'>
                                    <div className="nomnumeroiao">{numero.nom}</div>
                                    <div className="numeroiao">{numero.numero}</div>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="row2col2iao">
                        <div className="camerabox"> Caméra de surveillance </div>
                    </div>
                </div>
            </div>
        )
    }
}