import React, { useState, } from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';


/*function NavbarC() {
  return (
    <nav>
      <div className="logo">
        <a >DEVELOPERS</a>
      </div>
        <ul className="nav-menu">
          <li><a href="/">Inicios</a></li>
          <li><a href="/users">Clientes</a></li>
          <li><a href="/Transacciones">Transacciones</a></li>
          <li><a href="/CuentasContables">Cuentas Contables</a></li>
          <li><a href="/Reportes">Reportes</a></li>
        </ul>
      <div className="login">
        <button href="/login" type="button">Iniciar sesión</button>
      </div>
    </nav>
  );

}*/

//export default NavbarC;

class NavbarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="xl">
          <NavbarBrand href="/">DEVELOPERS</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/" expand="lg">Inicio</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Transacciones">Transacciones</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/CuentasContables">Cuentas Contables</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavbarComponent;