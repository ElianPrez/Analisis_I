import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit} from '@fortawesome/free-solid-svg-icons';

class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAbierto: false,
            codigo: "",
            nombre: "",
            direccion: "",
            telefono: "",
            email: "",
            nit: "",
            cliente: props.cliente,
            errores: [],
            enviado: false
        }
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modalAbierto: !prevState.modalAbierto
        }));
    };


    cambioValor = (e) => {
        const { cliente } = this.state;
    const { name, value } = e.target;
    this.setState({
        cliente: {
            ...cliente,
            [name]: value
        }
    });
    }

    verificarError(elemento) {
        return this.state.errores.indexOf(elemento) !== -1;
    }

    enviarDatos = (e) => {
        e.preventDefault();

        const { cliente } = this.state;
        
        var errores = [];
        if (!cliente.codigo) errores.push("error_codigo");
        if (!cliente.nit || (cliente.nit && !/^[0-9]{4,12}(-?[0-9K])?$/.test(cliente.nit))) errores.push("error_nit");
        if (!cliente.nombre || (cliente.nombre && !/^[a-zA-Z0-9\s]*$/.test(cliente.nombre))) errores.push("error_nombre");
        if (!cliente.direccion || (cliente.direccion && !/^[a-zA-Z0-9\s]*$/.test(cliente.direccion))) errores.push("error_direccion");
        if (!cliente.telefono || cliente.telefono && !/^[0-9]{8}?$/.test(cliente.telefono)) errores.push("error_telefono");
        if (!cliente.email) errores.push("error_email");
        this.setState({errores:errores });
        if(errores.length>0)return false;

        var datosEnviar = { 
            clieN_ID: cliente.codigo, 
            nombre: cliente.nombre, 
            direccion: cliente.direccion, 
            telefono: cliente.telefono, 
            email: cliente.email, 
            nit: cliente.nit, };

        
            fetch(`https://localhost:44359/Oracle/${cliente.codigo}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datosEnviar)
            })
                .then(respuesta => {
                    console.log(respuesta); // Verifica la respuesta del servidor
                    return respuesta.json();
                })
                .then((datosRespuesta) => {
                    console.log(datosRespuesta);
                    this.toggleModal(); // Cerrar modal solo si los datos se envían correctamente
                    console.log("Formulario enviado...");
                    // Puedes realizar otras acciones aquí si es necesario
                })
                .catch(error => {
                    console.error("Error al enviar formulario:", error);
                    this.toggleModal();
                    this.setState({ enviado: true });
                })
                .finally(() => window.location.href = '/users');
            
    }


    render() {

        const { modalAbierto, cliente, enviado } = this.state;
        return (
            <span>
                <button className="btn btn-primary" onClick={this.toggleModal}>
          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        </button>
                <Modal isOpen={modalAbierto} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Editar Cliente</ModalHeader>
                    <ModalBody>
                        <div className='form-group' onSubmit={this.enviarDatos}>
                            <div className="form-group">
                                <label htmlFor="codigo">Codigo:</label>
                                <input type="number" name="codigo" onChange={this.cambioValor}  disabled value={cliente.codigo} id="codigo"
                                    className={((this.verificarError("error_codigo")) ? "is-invalid" : "") + "form-control"} placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese codigo</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor=""> NIT:</label>
                                <input type="text" name="nit" onChange={this.cambioValor} value={cliente.nit} id="nit"
                                    className={((this.verificarError("error_nit")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese NIT valido!</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Nombre:</label>
                                <input type="text" name="nombre" onChange={this.cambioValor} value={cliente.nombre} id="nombre"
                                    className={((this.verificarError("error_nombre")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese un nombre valido</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Direccion:</label>
                                <input type="text" name="direccion" onChange={this.cambioValor} value={cliente.direccion} id="direccion"
                                    className={((this.verificarError("error_direccion")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese una direccion valida</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Telefono:</label>
                                <input type="tel" name="telefono" onChange={this.cambioValor} value={cliente.telefono} id="telefono"
                                    className={((this.verificarError("error_telefono")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese un telefono valido</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Email:</label>
                                <input type="email" name="email" onChange={this.cambioValor} value={cliente.email} id="email"
                                    className={((this.verificarError("error_email")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese un correo valido</small>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type="submit" className="btn btn-success" onClick={this.enviarDatos} disabled={enviado}>Agregar</button>
                        <button className="btn btn-primary" onClick={this.toggleModal}>Cancelar</button>
                    </ModalFooter> 
                </Modal>
            </span>
        );
    }
}

export default Crear;