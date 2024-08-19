import Inicio from './Inicio'; // Importación del componente Navbar
import Navbar from './Navbar'; // Importación del componente Navbar
import Login from './login'; // Importación del componente Navbar
import Users from './Datos_u'; // Importación del componente Navbar
import Table from './Table';
import Listar from './componenetes/Clientes/Listar';
import Editar from './componenetes/Clientes/Editar';
import Crear from './componenetes/Clientes/Crear';
import Sidebar from './Navbar';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route exact path="/" Component={Inicio} ></Route>
      <Route path="/login" Component={Login} ></Route>
      <Route path="/listar" Component={Listar} ></Route>
      <Route path="/table" Component={Table} ></Route>
      <Route path="/editar/:clieN_ID" Component={Editar} ></Route>
      <Route path="/crear" Component={Crear} ></Route>
      <Route path="/users" Component={Listar} ></Route>
    </Router>
  );
}

export default App;
