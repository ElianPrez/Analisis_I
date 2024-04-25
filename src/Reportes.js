import React from 'react';
import './lista.css';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['Proveedor 1', 'Proveedor 2', 'Proveedor 3', 'Proveedor 4', 'Proveedor 5'],
  datasets: [
    {
      label: 'Cuentas por pagar',
      data: [1500, 2000, 1200, 1700, 900],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Reportes = () => {
  return (
    <div className="accounts-payable-report">
      <div className="chart-container">
        <h1>LISTADO DE PROVEEDORES</h1>
      </div>
      <table>
        <thead chart-container> 
          <tr>
            <th>Proveedores</th>
            <th>Fecha de vencimiento</th>
            <th>Monto</th>
            <th>Estado de pago</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Proveedor 1</td>
            <td>01/04/2023</td>
            <td>Q1500.00</td>
            <td>Vencida</td>
          </tr>
          <tr>
            <td>Proveedor 2</td>
            <td>12/04/2023</td>
            <td>Q2000.00</td>
            <td>Pendiente</td>
          </tr>
          <tr>
            <td>Proveedor 3</td>
            <td>15/04/2023</td>
            <td>Q1200.00</td>
            <td>Vencida</td>
          </tr>
          <tr>
            <td>Proveedor 4</td>
            <td>19/04/2023</td>
            <td>1700.00</td>
            <td>Pendiente</td>
          </tr>
          <tr>
            <td>Proveedor 5</td>
            <td>21/04/2023</td>
            <td>Q900.00</td>
            <td>Vencida</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Reportes;
