import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Api from '../servicios/api';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Crear from './Crear';
import Editar from './Editar';
import Editar2 from './Editar2';

class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            empleados: [],
            cliente: [],
        }
    }

    borrarRegistros(clieN_ID) {
        console.log(clieN_ID);
        fetch(`https://localhost:44359/Oracle/${clieN_ID}`, {
            method: 'DELETE'
        })
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                console.log(datosRespuesta)
                this.cargarDatos();
            })
            .catch(console.log)
            .finally(() => window.location.href = '/users');
    }


    cargarDatos() {
        fetch("https://localhost:44359/Oracle")
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                console.log(datosRespuesta)
                this.setState({ datosCargados: true, cliente: datosRespuesta })
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.cargarDatos();
    }


    render() {

        const { datosCargados, cliente } = this.state
        if (!datosCargados) { return (<div>Cargando...</div>); }
        else {
            return (
                <div className="card">
                    <div className="card-header">
                        {/* Llama al componente del modal de creación */}
                        <Crear
                            modalAbierto={this.state.modalAbierto}
                            toggleModal={() => this.setState({ modalAbierto: !this.state.modalAbierto })}
                            agregarCliente={this.agregarClienteYCerrarModal}
                            cliente={({ codigo: cliente.clieN_ID})}
                        />
                    </div>
                    <div className="card-body">
                        <h4>LISTA DE CLIENTES</h4>
                        <table className="table table-striped table-hove">
                            <thead>
                                <tr >
                                    <th>CODIGO</th>
                                    <th>NIT</th>
                                    <th>NOMBRE</th>
                                    <th>DIRRECCION</th>
                                    <th>TELEFONO</th>
                                    <th>EMAIL</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cliente.map(
                                    (cliente) => (
                                        <tr key={cliente.clieN_ID}>
                                            <td>{cliente.clieN_ID}</td>
                                            <td>{cliente.nit}</td>
                                            <td>{cliente.nombre}</td>
                                            <td>{cliente.direccion}</td>
                                            <td>{cliente.telefono}</td>
                                            <td>{cliente.email}</td>
                                            <td >
                                               
                                                <Editar2
                                                    modalAbierto={this.state.modalAbierto}
                                                    toggleModal={() => this.setState({ modalAbierto: !this.state.modalAbierto })}
                                                    cliente={({ codigo: cliente.clieN_ID , nit: cliente.nit, nombre: cliente.nombre, 
                                                        direccion: cliente.direccion, telefono: cliente.telefono, email: cliente.email})}
                                                />
                                                
                                                &nbsp;
                                                &nbsp;
                                                <button className="btn btn-danger" onClick={() => this.borrarRegistros(cliente.clieN_ID)}>
                                                    <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer text-muted">
                    </div>
                </div>

            );
        }
    }
}


export default Listar;
