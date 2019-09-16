import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      links: [
        { link: "/board", text: "Messages" },
        { link: "/", text: "Nouveau message" },
        { link: "/accueil", text: "Accueil" },
        { link: "/iao", text: "IAO" },
        { link: "/bocal", text: "Local médical" },
        { link: "/service", text: "Gestion des services" }
      ]
    };
  }

  getLinks = () => {
    const { links } = this.state;
    return (
      <ul className="navbar-nav mr-auto">
        {links.map((link, count) => {
          return (
            <li className="nav-item" key={count}>
              <Link to={link.link} className="nav-link">
                {link.text}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/user">
          Messagerie - Urgences de Melun
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          {this.getLinks()}

          <span className="navbar-text">Blabla</span>
        </div>
      </nav>
    );
  }
}
