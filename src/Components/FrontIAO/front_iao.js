import React, { Component } from "react";
import "./front_iao.css";


export default class FrontIAO extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render(){
        return(
            <div>
                <div className="row1iao">
                <div className="messageiao"> Blabla</div>
                <div className="boxalarm"> </div>
                </div>

                <div className="row2iao">
                <div className="row2col1iao">
                
                <div className="row2col1row1iao"> Informations Générales</div>
                <div className="row2col1row2iao"> Tableau des attentes</div>
                <div className="row2col1row3iao"> Numéros importants</div>

                </div>
                <div className="row2col2iao">
                <div className="camerabox"> Caméra de surveillance </div>
                </div>
                </div>
            </div>
        )
    }
}