import React from 'react';
import Listar from './Listar';
import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit} from '@fortawesome/free-solid-svg-icons';

class Editar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      cliente: {
        clieN_ID: '',
        nit: '',
        nombre: '',
        direccion: '',
        telefono: '',
        email: ''
      },
      modalAbierto: false
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modalAbierto: !prevState.modalAbierto
    }));
  };

  componentDidMount() {
    if (this.props.match && this.props.match.params) {
      fetch(`https://localhost:44359/Oracle/${this.props.match.params.cliente}`)
        .then(respuesta => respuesta.json())
        .then((datosRespuesta) => {
          console.log(datosRespuesta);
          this.setState({ datosCargados: true, cliente: datosRespuesta });
        })
        .catch(error => {
          console.log("error controlado: "+error)
        });


    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      cliente: {
        ...prevState.cliente,
        [name]: value
       
      }
    }));
  }
  

  enviarDatos = (e) => {
    e.preventDefault();

    const { codigo, nit, nombre, direccion, telefono, email } = this.state;

    var errores = [];
    if (!codigo) errores.push("error_codigo");
    if (!nit || (nit && !/^[0-9]{4,12}(-?[0-9kK])?$/.test(nit))) errores.push("error_nit");
    if (!nombre || (nombre && !/^[a-zA-Z0-9\s]*$/.test(nombre))) errores.push("error_nombre");
    if (!direccion || (direccion && !/^[a-zA-Z0-9\s]*$/.test(direccion))) errores.push("error_direccion");
    if (!telefono || telefono && !/^[0-9]{8}?$/.test(telefono)) errores.push("error_telefono");
    if (!email) errores.push("error_email");
    this.setState({errores:errores });
    if(errores.length>0)return false;


    var datosEnviar = { clieN_ID: codigo, nombre: nombre, direccion: direccion, telefono: telefono, email: email, nit: nit, };

        fetch(`https://localhost:44359/Oracle/${codigo}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosEnviar)
        })
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                console.log(datosRespuesta);
                this.toggleModal(); // Cerrar modal solo si los datos se envían correctamente
                console.log("Formulario enviado...");
                // Puedes realizar otras acciones aquí si es necesario
            })
            .catch(error => {
                console.error("Error al enviar formulario:", error);
                this.toggleModal();
            })
            .finally(() => window.location.href = '/users');
}


  render() {
    const { modalAbierto, cliente } = this.state

    return (
      <span>
        <button className="btn btn-primary" onClick={this.toggleModal}>
          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        </button>
        <Modal isOpen={modalAbierto} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Editar Cliente</ModalHeader>
          <ModalBody>
            <div className="form-group" onSubmit={this.enviarDatos}>
              <div className="form-group">
                <label htmlFor="">Codigo:</label>
                <input type="text" name="clien_ID" onChange={this.handleChange} value={cliente.codigo} id="clien_ID"
                  placeholder="" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Escribir nombre del proveedor</small>
              </div>

              <div className="form-group">
                <label htmlFor=""> NIT:</label>
                <input type="text" name="nit" onChange={this.handleChange} value={cliente.nit} id="nit"
                  placeholder="" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Escribir nit del proveedor</small>
              </div>

              <div className="form-group">
                <label htmlFor="">Nombre:</label>
                <input type="text" name="nombre" onChange={this.handleChange} value={cliente.nombre} id="nombre"
                  placeholder="" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Escribir email del proveedor</small>
              </div>

              <div className="form-group">
                <label htmlFor="">Direccion:</label>
                <input type="text" name="direccion" onChange={this.handleChange} value={cliente.direccion} id="direccion"
                  placeholder="" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Escribir email del proveedor</small>
              </div>

              <div className="form-group">
                <label htmlFor="">Telefono:</label>
                <input type="text" name="telefono" onChange={this.handleChange} value={cliente.telefono} id="telefono"
                  placeholder="" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Escribir email del proveedor</small>
              </div>

              <div className="form-group">
                <label htmlFor="">Email:</label>
                <input type="text" name="email" onChange={this.handleChange} value={cliente.email} id="email"
                  placeholder="" aria-describedby="helpId" />
                <small id="helpId" className="invalid-feedback">Escribir email del proveedor</small>
              </div>

            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-success" onClick={this.enviarDatos}>Agregar</button>
            <button className="btn btn-primary" onClick={this.toggleModal}>Cancelar</button>
          </ModalFooter>
        </Modal>
      </span>
    );
  }

}
export default Editar;