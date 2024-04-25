import Inicio from './Inicio'; // Importación del componente Navbar
import Navbar from './Navbar'; // Importación del componente Navbar
import Login from './login'; // Importación del componente Navbar
import Users from './Datos_u'; // Importación del componente Navbar
import Reportes from './Reportes'; // Importación del componente Navbar
import Table from './Table';
import Listar from './componenetes/Listar';
import Editar from './componenetes/Editar';
import Crear from './componenetes/Crear';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (

    <Router>
    <nav>
    <div className="logo">
      <a >DEVELOPERS</a>
    </div>
    <ul className="nav-menu">
      <li><a href="/">Inicio</a></li>
      <li><a href="/users">Clientes</a></li>
      <li><a href="/reportes">Reportes</a></li>
      <li><a href="/table">Notificaciones</a></li>
    </ul>
    {/*<div className="login">
      <button href="/login" type="button">Iniciar sesión</button>
  </div>*/}
  </nav>

    <Route  exact path="/" Component={Inicio} ></Route>
     <Route  path="/login" Component={Login} ></Route>
     <Route  path="/listar" Component={Listar} ></Route>
     <Route  path="/table" Component={Table} ></Route>
     <Route  path="/editar/:clieN_ID" Component={Editar} ></Route>
     <Route  path="/crear" Component={Crear} ></Route>
     <Route  path="/users" Component={Listar} ></Route>
   </Router>
  );
}

export default App;
