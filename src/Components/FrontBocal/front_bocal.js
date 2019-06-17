import React, { Component } from "react";
import Navbar from "../../Containers/Navbar";
import "./front_bocal.css";

export default class FrontBocal extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="row1bocal">
          <div className="messagebocal"> Blabla</div>
          <div className="boxalarm"> </div>
        </div>

        <div className="row2bocal">
          <div className="row2col1bocal">
            <div className="row2col1row1bocal"> Informations Générales</div>
            <div className="row2col1row2bocal"> Tableau des attentes</div>
            <div className="row2col1row3bocal"> Numéros importants</div>
          </div>
          <div className="row2col2bocal">
            <div className="tabanalysis"> Analyses de santé </div>
          </div>
        </div>
      </div>
    );
  }
}
