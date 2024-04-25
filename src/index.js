import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Inicio from './Inicio'; // Importación del componente Navbar
import Navbar from './Navbar'; // Importación del componente Navbar
import Login from './login'; // Importación del componente Navbar
import App from './App'; // Importación del componente Navbar
import Users from './Datos_u'; // Importación del componente Navbar
import Reportes from './Reportes'; // Importación del componente Navbar
import Table from './Table';  
import Listar from './componenetes/Listar'; 
import Editar from './componenetes/Editar'; 
import Crear from './componenetes/Crear'; 
//import Users from '/Datos_u';
//import { BrowserRouter as Router,  Switch, Route, Link } from 'react-router-dom';
import { createBrowserRouter, RouterProvider, Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio/>,
    errorElement: <h1>Error</h1>,
  },
  {
    path: "/login",
    element: <Login/>,
    errorElement: <h1>Error</h1>,
  },
 {
  path:"/users",
  element: <Listar/>,
 },
  {
    path:"/table",
    element: <Table/>,
    errorElement: <h1>Error</h1>,
  },
  {
    path:"/reportes",
    element: <Reportes/>,
    errorElement: <h1>Error</h1>,
  },
  {
    path:"/editar",
    element: <Editar/>,
    errorElement: <h1>Error</h1>,
      
  },
  {
    path:"/crear",
    element: <Crear/>,
    errorElement: <h1>Error</h1>,
      
  },

]);



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
  <Navbar/>
  <RouterProvider router={router}/>

  </>
);





