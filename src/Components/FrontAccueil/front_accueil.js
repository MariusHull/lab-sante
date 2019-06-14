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
                },
            ]
        }
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

                    <div className='ordrepassage'>
                        <h2 className="soustitreordre">Ordre de passage </h2>
                        <br />
                        {this.state.ordre.slice(0,1).map(patient =>
                            <div className='ordrebox1'> <div className="textbox">Attendu à l'accueil: {patient.name} </div></div>)}
                        {this.state.ordre.slice(1, 8).map(patient =>
                            <div className='ordrebox'> <div className="textbox"> {patient.name} </div></div>)}

                    </div>

                    <div className='procedures'>
                        <h2 className="soustitreprocedure">Procédures</h2>
                        <div className="textprocedure">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum neque magna, eu venenatis purus egestas ut. In id sapien vel ex laoreet condimentum quis nec elit. Curabitur mattis tempus purus ut gravida. Praesent iaculis mi sed rhoncus mattis. Vestibulum ac commodo erat. Nulla quis magna ac eros blandit blandit non at leo. Donec rhoncus venenatis dolor gravida dignissim. Vestibulum aliquam nisl erat, a dictum mauris viverra viverra. Cras a erat nec turpis cursus mattis. Sed metus magna, interdum et ex ac, volutpat posuere nisi. Quisque cursus, mauris ac ornare gravida, ligula neque rutrum nibh, vitae luctus justo massa sed metus. In consectetur nec quam sit amet fermentum. Etiam congue neque non lectus scelerisque, vitae sollicitudin purus imperdiet.

Morbi pharetra cursus erat convallis fermentum. Etiam risus risus, vestibulum a purus at, consectetur convallis ante. Etiam pellentesque leo mauris, sit amet semper tortor tincidunt quis. Integer vehicula ornare lacus, ut tincidunt metus. Suspendisse suscipit leo viverra viverra ultricies. Morbi vel faucibus mauris. Donec hendrerit dui et est elementum placerat. Vivamus condimentum massa eget aliquam suscipit. Aliquam dapibus odio et lobortis tristique. Aliquam faucibus iaculis eros, a posuere arcu fringilla vel. Praesent tortor turpis, posuere ut nisl eget, ornare auctor turpis. Nam ac volutpat augue, non consectetur ligula. Etiam euismod tellus sit amet metus pellentesque porta.</div>
                    </div>
                </div>
            </div>
        )
    }
}

