import React from 'react';
import './Navbar.css';
import './Inicio.css';
import imagenInicio from './Imagenes/logo.jpeg';

function Inicio() {
    return (
      <div className="cont">
        <h1 >SISTEMA DE CONTABILIDAD</h1>
        <p>Bienvenido al sistema de Contabilida.</p>
        <img src={imagenInicio} alt="Imagen de inicio" style={{ width: '30%', height: '20%' }} />
      </div>
    );
  }
  
  export default Inicio;
