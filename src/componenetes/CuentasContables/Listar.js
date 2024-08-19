import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Api from '../../servicios/api';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader, ModalFooter, Table, Button, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Crear from './Crear';
import Editar2 from './Editar2';
import ReactPaginate from 'react-paginate';
import { CSVLink } from 'react-csv';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            empleados: [],
            cliente: [],
            modalAbierto: false,
            currentPage: 0,
            itemsPerPage: 10,
            searchTerm: ''
        };
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    borrarRegistros(cuentaid) {
        console.log(cuentaid);
        fetch(`https://localhost:44359/cuentasContables/eliminar/${cuentaid}`, {
            method: 'DELETE'
        })
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                console.log(datosRespuesta)
                this.cargarDatos();
            })
            .catch(console.log)
            .finally(() => window.location.href = '/CuentasContables');
    }


    cargarDatos() {
        fetch("https://localhost:44359/cuentasContables/listar")
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                console.log(datosRespuesta)
                this.setState({ datosCargados: true, cuentascontables: datosRespuesta })
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.cargarDatos();
    }

    handlePageClick = (data) => {
        this.setState({ currentPage: data.selected });
    };

    handleSearch(event) {
        this.setState({ searchTerm: event.target.value });
    }


    render() {

        const { datosCargados, cuentascontables, currentPage, itemsPerPage, searchTerm } = this.state
        if (!datosCargados) { return (<div>Cargando...</div>); }
        else {
            const offset = currentPage * itemsPerPage;
            const filteredEntries = cuentascontables.filter(entry =>
                entry.cuentaid.toString().includes(searchTerm) ||
                entry.alterno.toString().includes(searchTerm) ||
                entry.nomcuenta.toLowerCase().includes(searchTerm.toLowerCase()) ||
                entry.superior.toString().includes(searchTerm) ||
                entry.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                entry.nivel.toString().includes(searchTerm.toLowerCase())
            );
            const currentPageData = filteredEntries.slice(offset, offset + itemsPerPage);
            const pageCount = Math.ceil(filteredEntries.length / itemsPerPage);

            // Configuración para el archivo CSV
            const csvData = cuentascontables.map(({ cuentaid, alterno, nomcuenta, superior, tipo, nivel }) => ({
                Codigo: cuentaid,
                Alterno: alterno,
                'Nombre Cuenta': nomcuenta,
                Superior: superior,
                Tipo: tipo,
                Nivel: nivel
            }));

            // Estilos para el PDF
            const styles = StyleSheet.create({
                page: {
                    backgroundColor: '#fff',
                    padding: 20,
                  },
                  section: {
                    marginBottom: 20,
                  },
                  table: {
                    flexDirection: 'row', // Arrange table cells horizontally
                                     },
                  header: {
                    flexDirection: 'row',
                    borderWidth: 1, // Add a border around the entire table
                    borderColor: '#ccc', // Light gray border color
                    backgroundColor: '#eee', // Light gray background for headers
                    padding: 5,
                  },
                  headerText: {
                    fontWeight: 'bold',
                    fontSize: 12,
                    flex: 1,
                    alignSelf: 'space-between',
                  },
                  row: {
                    flexDirection: 'row',
                    borderBottomWidth: 1, // Add a border below each row
                    borderColor: '#ccc',
                    padding: 5,
                  },
                  cell: {
                    flex: 15, // Allow cells to expand and wrap if needed
                    alignSelf: 'space-between',
                    fontSize: 10,
                  },
                  
            });

            const PDFDocument = (
                <Document>
                <Page size="A4" style={styles.page}>
                  <View style={styles.section}>
                    <View style={styles.header}>
                      <Text style={styles.headerText}>Cuenta ID</Text>
                      <Text style={styles.headerText}>Alterno</Text>
                      <Text style={styles.headerText}>Nombre de Cuenta</Text>
                      <Text style={styles.headerText}>Superior</Text>
                      <Text style={styles.headerText}>Tipo</Text>
                      <Text style={styles.headerText}>Nivel</Text>
                    </View>
                    <View>
                      {filteredEntries.map(({ cuentaid, alterno, nomcuenta, superior, tipo, nivel }) => (
                        <View key={cuentaid} style={styles.row}>
                          <Text style={styles.cell}>{cuentaid}</Text>
                          <Text style={styles.cell}>{alterno}</Text>
                          <Text style={styles.cell}>{nomcuenta}</Text>
                          <Text style={styles.cell}>{superior}</Text>
                          <Text style={styles.cell}>{tipo}</Text>
                          <Text style={styles.cell}>{nivel}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </Page>
              </Document>
            );

            

            return (
                <Container className="my-3" >
                    <div className="card">
                        <div className="card-header">
                            {/* Llama al componente del modal de creación */}
                            <Crear
                                modalAbierto={this.state.modalAbierto}
                                toggleModal={() => this.setState({ modalAbierto: !this.state.modalAbierto })}
                                cuentascontables={({ codigo: cuentascontables.cuentaid })}
                            />
                        </div>
                        <div className="card-body">
                            <Row className="justify-content-end g-2">
                                <Col>
                                    <h4>LISTADO DE CUENTAS CONTABLES</h4>
                                </Col>
                                <Col md="auto">
                                    <strong><Label for="search" className="mr-3">Buscar</Label></strong>
                                </Col>
                                <Col md="auto">
                                    <Input
                                        type="text"
                                        name="search"
                                        id="search"
                                        placeholder="Buscar..."
                                        value={searchTerm}
                                        onChange={this.handleSearch}
                                        style={{ width: '100%' }}
                                    />
                                </Col>
                            </Row>
                            <Button className='btn btn-info' onClick={this.exportToCSV} >
                                <CSVLink className="text-black" data={csvData} filename={"cuentas_contables.csv"}>Exportar a CSV</CSVLink>
                            </Button>
                            &nbsp;
                            &nbsp;
                            <Button className="btn btn-info" onClick={this.exportToPDF}>
                            <PDFDownloadLink className="text-black" document={PDFDocument} fileName="cuentas_contables.pdf">
                                {({ blob, url, loading, error }) => (loading ? 'Cargando documento...' : 'Exportar a PDF')}
                            </PDFDownloadLink>
                            </Button>
                            <Table responsive striped bordered hover className='my-2'>
                                <thead>
                                    <tr >
                                        <th>CODIGO</th>
                                        <th>ALTERNO</th>
                                        <th>NOMBRE CUENTA</th>
                                        <th>SUPERIOR</th>
                                        <th>TIPO</th>
                                        <th>NIVEL</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPageData.map(
                                        (cuentascontables) => (
                                            <tr key={cuentascontables.cuentaid}>
                                                <td>{cuentascontables.cuentaid}</td>
                                                <td>{cuentascontables.alterno}</td>
                                                <td>{cuentascontables.nomcuenta}</td>
                                                <td>{cuentascontables.superior}</td>
                                                <td>{cuentascontables.tipo}</td>
                                                <td>{cuentascontables.nivel}</td>
                                                <td >
                                                    <Editar2
                                                        modalAbierto={this.state.modalAbierto}
                                                        toggleModal={() => this.setState({ modalAbierto: !this.state.modalAbierto })}
                                                        cuentascontables={({
                                                            codigo: cuentascontables.cuentaid, nombre: cuentascontables.nomcuenta, superior: cuentascontables.superior,
                                                            tipo: cuentascontables.tipo, nivel: cuentascontables.nivel
                                                        })}
                                                    />
                                                    &nbsp;
                                                    &nbsp;
                                                    <button className="btn btn-danger" onClick={() => this.borrarRegistros(cuentascontables.cuentaid)}>

                                                        <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </Table>
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
