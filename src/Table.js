import React, { useState } from 'react';
import './lista.css';
///export './Table.css';
const Table = () => {
  const [elementos, setElementos] = useState([
    { id: 1, nombre: 'PROVEEDOR', descripcion: 'Descripción ' },
    { id: 2, nombre: 'PROVEEDOR', descripcion: 'Descripción ' },
    { id: 3, nombre: 'PROVEEDOR', descripcion: 'Descripción ' },
    { id: 4, nombre: 'PROVEEDOR', descripcion: 'Descripción ' },
    { id: 5, nombre: 'PROVEEDOR', descripcion: 'Descripción ' }
   
  ]);

  const verElemento = (id) => {
    // Lógica para ver un elemento específico
  };


  const eliminarElemento = (id) => {
    // Lógica para eliminar un elemento específico
  };

  return (
    <div>
      <h1>CUENTAS CONTABLES</h1>
          <table >
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {elementos.map((elemento) => (
                <tr key={elemento.id}>
                  <td>{elemento.id}</td>
                  <td>{elemento.nombre}</td>
                  <td>{elemento.descripcion}</td>
                  <td className='Table'>
                    <button onClick={() => verElemento(elemento.id)}>Ver</button>
                    <button onClick={() => eliminarElemento(elemento.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  );
};

export default Table;

