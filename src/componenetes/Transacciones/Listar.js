import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Api from '../../servicios/api';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader, ModalFooter,  Table, Button, Container, Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Crear from './Crear';
import Editar2 from './Editar2';
import ReactPaginate from 'react-paginate';

class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            transaccion: [],
            modalAbierto: false,
            currentPage: 0,
            itemsPerPage: 10
        }
    }

    borrarRegistros(transid) {
        console.log(transid);
        fetch(`https://localhost:44359/transacciones/eliminar/${transid}`, {
            method: 'DELETE'
        })
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                console.log(datosRespuesta)
                this.cargarDatos();
            })
            .catch(console.log)
            .finally(() => window.location.href = '/transacciones');
    }


    cargarDatos() {
        fetch("https://localhost:44359/transacciones2/listar")
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                console.log(datosRespuesta)
                this.setState({ datosCargados: true, transaccion: datosRespuesta })
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.cargarDatos();
       /* this.setState({
            datosCargados: true,
            transaccion: this.simulateDataFetch() // Reemplaza esto con tu método de carga de datos real
        });*/
    }


    handlePageClick = (data) => {
        this.setState({ currentPage: data.selected });
    };


    render() {
        const { datosCargados, transaccion, currentPage, itemsPerPage  } = this.state;
        if (!datosCargados) { return (<div>Cargando...</div>); }
        else {
            const offset = currentPage * itemsPerPage;
            const currentPageData = transaccion.slice(offset, offset + itemsPerPage);
            const pageCount = Math.ceil(transaccion.length / itemsPerPage);
            return (
                <Container  className="my-4">
                <div className="card">
                    <div className="card-header">
                        {/* Llama al componente del modal de creación */}
                        <Crear
                            modalAbierto={this.state.modalAbierto}
                            toggleModal={() => this.setState({ modalAbierto: !this.state.modalAbierto })}
                            transaccion={({ codigo: transaccion.transid })}
                        />
                    </div>
                    <div className="card-body">
                        <h4>LISTA DE TRANSACCIONES</h4>
                        <Row>
                        <Col>
                        <Table responsive striped bordered hover>
                        {/*</Table><table className="table table-striped table-hove container-fluid">*/}
                            <thead>
                                <tr >
                                    <th>CODIGO</th>
                                    <th>NO_PARTIDA</th>
                                    <th>FECHA</th>
                                    <th>CUENTA CONTABLE</th>
                                    <th>MONTO DEBE</th>
                                    <th>MONTO HABER</th>
                                    <th>ENTIDAD</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.map(
                                    (transaccion) => (
                                        <tr key={transaccion.transid}>
                                            <td>{transaccion.transid}</td>
                                            <td>{transaccion.nO_PARTIDA}</td>
                                            <td>{transaccion.fecha}</td>
                                            <td>{transaccion.ctaid}</td>
                                            <td>{transaccion.montodebe}</td>
                                            <td>{transaccion.montohaber}</td>
                                            <td>{transaccion.entidadid}</td>
                                            <td >
                                            <Editar2
                                                    modalAbierto={this.state.modalAbierto}
                                                    toggleModal={() => this.setState({ modalAbierto: !this.state.modalAbierto })}
                                                    transaccion={({
                                                        codigo: transaccion.transid, fecha: transaccion.fecha, descrip: transaccion.descrip,
                                                        ctadebito: transaccion.ctadebito, ctacredito: transaccion.ctacredito, 
                                                        montodebito: transaccion.montodebito, montocredito: transaccion.montocredito,
                                                        entidadid: transaccion.entidadid
                                                    })}
                                                />
                                                &nbsp;
                                                &nbsp;
                                                <button className="btn btn-danger" onClick={() => this.borrarRegistros(transaccion.transid)}>
                                                    <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </Table>
                        </Col>
                        </Row>
                        <ReactPaginate
                           previousLabel={'«'}
                            nextLabel={'»'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={'pagination justify-content-center'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            activeClassName={'active'}
                            disabledClassName={'disabled'}
                        />
                    </div>
                    <div className="card-footer text-muted">
                    </div>
                </div>
                
                </Container>
            );
        }
    }
}


export default Listar;
