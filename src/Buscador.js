import React, { useState } from 'react';
import './Buscador.css';

const Buscador = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(`Searching for "${searchTerm}" between ${startDate} and ${endDate}`);
  };

  return (
    <div className="accounts-payable-search">
       <h1>REPORTES</h1>
      <form  className="form-group" onSubmit={handleSearchSubmit}>
        <div className="form-row">
          <div className="form-control col-md-4">
            <label htmlFor="search-term">Nombre del proveedor</label>
            <input
              type="text"
              className="form-control"
              id="search-term"
              placeholder="Ingrese el nombre del proveedor"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="start-date">Fecha de inicio</label>
            <input
              type="date"
              className="form-control"
              id="start-date"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="end-date">Fecha de fin</label>
            <input
              type="date"
              className="form-control"
              id="end-date"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
          Buscar
        </button>
        </div>
        
      </form>
    </div>
  );
};

export default Buscador;
