import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav>
      <div className="logo">
        <a >DEVELOPERS</a>
      </div>
        <ul className="nav-menu">
          <li><a href="/">Inicio</a></li>
          <li><a href="/users">Clientes</a></li>
          <li><a href="/reportes">Proveedores</a></li>
          <li><a href="/table">Cuentas Contables</a></li>
        </ul>
      <div className="login">
       {/* <button href="/login" type="button">Iniciar sesión</button>*/}
      </div>
    </nav>
  );

}

export default Navbar;
