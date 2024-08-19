import { isDisabled } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAbierto: false,
            codigo: "",
            nombre: "",
            superior: "",
            tipo: "",
            nivel: "",
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

        const { codigo, nombre, superior, tipo, nivel } = this.state;

        var errores = [];
        if (!codigo || (codigo && !/^[0-9]*$/.test(codigo))) errores.push("error_codigo");
        if (!nombre || (nombre && !/^[a-zA-Z0-9\s]*$/.test(nombre))) errores.push("error_nombre");
        if (!superior || (superior && !/^[a-zA-Z0-9\s]*$/.test(superior))) errores.push("error_superior");
       // if (!tipo || (tipo && !/^[a-zA-Z0-9\s]*$/.test(tipo))) errores.push("error_tipo");
       // if (!nivel || (nivel && !/^[0-9]*$/.test(nivel))) errores.push("error_nivel");
        this.setState({ errores: errores });
        if (errores.length > 0) return false;

        var datosEnviar = { cuentaid: codigo, nomcuenta: nombre, superior: superior, tipo: tipo, nivel: nivel };


        fetch(`https://localhost:44359/cuentasContables/insertar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosEnviar)

        })
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                console.log(datosRespuesta);
                this.toggleModal();
                console.log("Datos a enviar:", datosEnviar);
                // Cerrar modal solo si los datos se envían correctamente
                console.log("Formulario enviado...");
                // Puedes realizar otras acciones aquí si es necesario
            })
            .catch(error => {
                console.error("Error al enviar formulario:", error);
                console.log("Datos a enviar:", datosEnviar);
                this.toggleModal();
                this.setState({ enviado: true });
            })
            .finally(() => window.location.href = '/CuentasContables');
    }

    render() {

        const { modalAbierto, codigo, nombre, superior, tipo,
            nivel, enviado } = this.state;

        return (
            <div>
                <button className="btn btn-success" onClick={this.toggleModal}>Agregar Nueva Cuenta Contable</button>
                <Modal isOpen={modalAbierto} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Agregar Nueva transaccion</ModalHeader>
                    <ModalBody>
                        <div className='form-group' onSubmit={this.enviarDatos}>

                            <div className="form-group">
                                <label htmlFor="">Codigo:</label>
                                <input type="number" name="codigo" onChange={this.cambioValor} value={codigo} id="codigo"
                                    className={((this.verificarError("error_codigo")) ? "is-invalid" : "") + "form-control"} placeholder="Ingrese codigo" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese codigo valido!</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Nombre:</label>
                                <input type="text" name="nombre" onChange={this.cambioValor} value={nombre} id="nombre"
                                    className={((this.verificarError("error_nombre")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese nombre" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese nombre valido!</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Superior:</label>
                                <input type="text" name="superior" onChange={this.cambioValor} value={superior} id="superior"
                                    className={((this.verificarError("error_superior")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese superior" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese un superior valido!</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Tipo:</label>
                                <select name="tipo" onChange={this.cambioValor} value={tipo.option} id="tipo"
                                    className={((this.verificarError("error_tipo")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese tipo" aria-describedby="helpId">
                                    <option value="">Seleccione una tipo</option>
                                    <option value="ACTIVO DEUDOR">ACTIVO DEUDOR</option>
                                    <option value="PASIVO ACREEDOR">PASIVO ACREEDOR</option>
                                    <option value="CAPITAL ACREEDOR">CAPITAL ACREEDOR</option>
                                    <option value="INGRESOS ACREEDOR">INGRESOS ACREEDOR</option>
                                    <option value="EGRESOS DEUDOR">EGRESOS DEUDOR</option>
                                    <option value="RESULTADOS DEUDOR">RESULTADOS DEUDOR</option>
                                </select>
                                <small id="helpId" className="invalid-feedback">Ingrese tipo valido!</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Nivel:</label>
                                <select name="nivel" onChange={this.cambioValor} value={nivel.option} id="nivel"
                                    className={((this.verificarError("error_nivel")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese nivel" aria-describedby="helpId">
                                    <option value="">Seleccione una nivel</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                <small id="helpId" className="invalid-feedback">Ingrese un numero valido!</small>
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