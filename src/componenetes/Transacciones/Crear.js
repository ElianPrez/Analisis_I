import { isDisabled } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAbierto: false,
            //codigo: "",
            fecha: "",
            descrip: "",
            ctadebito: "",
            ctacredito: "",
            montodebito: "",
            montocredito: "",
            entidadid: "",
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

    convertirFecha = (fecha) => {
        const [year, month, day] = fecha.split('-');
        return `${day}/${month}/${year}`;
    }

    enviarDatos = (e) => {
        
        e.preventDefault();

       const { fecha, descrip, ctadebito, ctacredito,  montodebito, montocredito, entidadid } = this.state;

       var errores = [];
        if (!fecha) errores.push("error_fecha");
        if (!descrip || (descrip && !/^[a-zA-Z0-9\s]*$/.test(descrip))) errores.push("error_descrip");
        if (!ctadebito ) errores.push("error_ctadebito");
        if (!ctacredito ) errores.push("error_ctacredito");
        if (!montodebito ) errores.push("error_montodebito");
        if (!montocredito ) errores.push("error_montocredito");
        if (!entidadid ) errores.push("error_entidadid");
        this.setState({errores:errores });
        if(errores.length>0)return false;

        const fechaConvertida = this.convertirFecha(fecha);

        var datosEnviar = { fecha: fechaConvertida, descrip: descrip,  ctadebito: ctadebito, 
            ctacredito: ctacredito, montodebito: montodebito, montocredito: montocredito, entidadid: entidadid };

            
            fetch(`https://localhost:44359/transacciones/insertar`, {
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
                    // Cerrar modal solo si los datos se envían correctamente
                    console.log("Formulario enviado...");
                    // Puedes realizar otras acciones aquí si es necesario
                })
                .catch(error => {
                    console.error("Error al enviar formulario:", error);
                    //console.log("Datos a enviar:", datosEnviar);
                    this.toggleModal();
                    this.setState({ enviado: true });
                })
                .finally(() => window.location.href = '/Transacciones');            
    }

    render() {

        const { modalAbierto, fecha, descrip, ctadebito, ctacredito,
             montodebito, montocredito, entidadid, enviado } = this.state;

        return (
            <div>
                <button className="btn btn-success" onClick={this.toggleModal}>Agregar Nueva Transaccion</button>
                <Modal isOpen={modalAbierto} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Agregar Nueva transaccion</ModalHeader>
                    <ModalBody>
                        <div className='form-group' onSubmit={this.enviarDatos}>
                            <div className="form-group">
                                <label htmlFor="">Fecha:</label>
                                <input type="date" name="fecha" onChange={this.cambioValor} value={fecha} id="fecha"
                                    className={((this.verificarError("error_fecha")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese fecha" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese fecha valida!</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor=""> Descripcion:</label>
                                <input type="text" name="descrip" onChange={this.cambioValor} value={descrip} id="descrip"
                                    className={((this.verificarError("error_descrip")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese descripcion" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese descripcion valida!</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Cuenta credito:</label>
                                <input type="number" name="ctadebito" onChange={this.cambioValor} value={ctadebito} id="ctadebito"
                                    className={((this.verificarError("error_ctadebito")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese cuenta credito" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese cuenta valida!</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Cuenta debito:</label>
                                <input type="number" name="ctacredito" onChange={this.cambioValor} value={ctacredito} id="ctacredito"
                                    className={((this.verificarError("error_ctadebito")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese cuenta debito" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese cuenta valida!</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Monto credito:</label>
                                <input type="number" name="montodebito" onChange={this.cambioValor} value={montodebito} id="montodebito"
                                    className={((this.verificarError("error_montodebito")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese monto credito" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese monto valido</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Monto debito:</label>
                                <input type="number" name="montocredito" onChange={this.cambioValor} value={montocredito} id="montocredito"
                                    className={((this.verificarError("error_montocredito")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese monto debito" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese monto valido</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Entidad:</label>
                                <input type="number" name="entidadid" onChange={this.cambioValor} value={entidadid} id="entidadid"
                                    className={((this.verificarError("error_entidadid")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese entidad" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese entidad valida!</small>
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