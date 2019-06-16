import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
      <ul class="navbar-nav mr-auto">
        {links.map((link, count) => {
          return (
            <li class="nav-item">
              <Link to={link.link} class="nav-link">
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
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="#">
          Messagerie - Urgences de Melun
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          {this.getLinks()}

          <span class="navbar-text">Blabla</span>
        </div>
      </nav>
    );
  }
}
