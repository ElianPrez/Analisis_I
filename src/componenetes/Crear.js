import { isDisabled } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAbierto: false,
            codigo: "100",
            nombre: "",
            direccion: "",
            telefono: "",
            email: "",
            nit: "",
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
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ state, errores: [] })
    }

    verificarError(elemento) {
        return this.state.errores.indexOf(elemento) !== -1;
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

        
            fetch(`https://localhost:44359/Oracle/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datosEnviar)
            })
                .then(respuesta => respuesta.json())
                .then((datosRespuesta) => {
                    console.log(datosRespuesta);
                    this.toggleModal()
                    ; // Cerrar modal solo si los datos se envían correctamente
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

        const { modalAbierto, codigo, nombre, direccion, telefono, email, nit, enviado } = this.state;

        return (
            <div>
                <button className="btn btn-success" onClick={this.toggleModal}>Agregar Nuevo Cliente</button>
                <Modal isOpen={modalAbierto} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Agregar Nuevo Cliente</ModalHeader>
                    <ModalBody>
                        <div className='form-group' onSubmit={this.enviarDatos}>
                            <div className="form-group">
                                <label hidden htmlFor="codigo">Codigo:</label>
                                <input type="hidden" name="codigo" onChange={this.cambioValor} value={codigo} id="codigo"
                                    className={((this.verificarError("error_codigo")) ? "is-invalid" : "") + "form-control"} placeholder="Ingrese codigo" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese codigo</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor=""> NIT:</label>
                                <input type="text" name="nit" onChange={this.cambioValor} value={nit} id="nit"
                                    className={((this.verificarError("error_nit")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese NIT" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese NIT valido!</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Nombre:</label>
                                <input type="text" name="nombre" onChange={this.cambioValor} value={nombre} id="nombre"
                                    className={((this.verificarError("error_nombre")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese nombre" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese un nombre valido</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Direccion:</label>
                                <input type="text" name="direccion" onChange={this.cambioValor} value={direccion} id="direccion"
                                    className={((this.verificarError("error_direccion")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese direccion" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese una direccion valida</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Telefono:</label>
                                <input type="tel" name="telefono" onChange={this.cambioValor} value={telefono} id="telefono"
                                    className={((this.verificarError("error_telefono")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese teléfono" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese un telefono valido</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Email:</label>
                                <input type="email" name="email" onChange={this.cambioValor} value={email} id="email"
                                    className={((this.verificarError("error_email")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese Email" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese un correo valido</small>
                            </div>


                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type="submit" className="btn btn-success" onClick={this.enviarDatos} disabled={enviado}>Agregar</button>
                        <button className="btn btn-primary" onClick={this.toggleModal}>Cancelar</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Crear;