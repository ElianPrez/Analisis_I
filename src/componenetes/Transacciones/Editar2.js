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
            fecha: "",
            descrip: "",
            ctadebito: "",
            ctacredito: "",
            montodebito: "",
            montocredito: "",
            entidadid: "",
            transaccion: props.transaccion,
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
        const { transaccion } = this.state;
    const { name, value } = e.target;
    this.setState({
        transaccion: {
            ...transaccion,
            [name]: value
        }
    });
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

        const { transaccion } = this.state;
        
        var errores = [];
       /* if (!transaccion.codigo) errores.push("error_codigo");
        if (!transaccion.nit || (transaccion.nit && !/^[0-9]{4,12}(-?[0-9K])?$/.test(transaccion.nit))) errores.push("error_nit");
        if (!transaccion.nombre || (transaccion.nombre && !/^[a-zA-Z0-9\s]*$/.test(transaccion.nombre))) errores.push("error_nombre");
        if (!transaccion.direccion || (transaccion.direccion && !/^[a-zA-Z0-9\s]*$/.test(transaccion.direccion))) errores.push("error_direccion");
        if (!transaccion.telefono || transaccion.telefono && !/^[0-9]{8}?$/.test(transaccion.telefono)) errores.push("error_telefono");
        if (!transaccion.email) errores.push("error_email");
        this.setState({errores:errores });*/
        if(errores.length>0)return false;

        const fechaConvertida = this.convertirFecha(transaccion.fecha);

        var datosEnviar = { 
            transid: transaccion.codigo, 
            fecha: fechaConvertida, 
            descrip: transaccion.descrip, 
            ctadebito: transaccion.ctadebito, 
            ctacredito: transaccion.ctacredito, 
            montodebito: transaccion.montodebito, 
            montocredito: transaccion.montocredito, 
            entidadid: transaccion.entidadid, };

        
            fetch(`https://localhost:44359/transacciones/actualizar/${transaccion.codigo}`, {
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
                    console.log("Datos a enviar:", datosEnviar);
                    this.toggleModal(); // Cerrar modal solo si los datos se envían correctamente
                    console.log("Formulario enviado...");
                    // Puedes realizar otras acciones aquí si es necesario
                })
                .catch(error => {
                    console.error("Error al enviar formulario:", error);
                    //console.log("Datos a enviar:", datosEnviar);
                    this.toggleModal();

                    this.setState({ enviado: true });
                })
               // .finally(() => window.location.href = '/Transacciones');
            
    }


    render() {

        const { modalAbierto, transaccion, enviado } = this.state;
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
                                <label htmlFor="codigo">CODIGO:</label>
                                <input type="number" name="transid" onChange={this.cambioValor}  disabled value={transaccion.codigo} id="transid"
                                    className={((this.verificarError("error_codigo")) ? "is-invalid" : "") + "form-control"} placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese codigo</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor=""> FECHA:</label>
                                <input type="date" name="fecha" onChange={this.cambioValor} value={transaccion.fecha} id="fecha"
                                    className={((this.verificarError("error_nit")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese NIT valido!</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">DESCRIPCION:</label>
                                <input type="text" name="descrip" onChange={this.cambioValor} value={transaccion.descrip} id="descrip"
                                    className={((this.verificarError("error_nombre")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese un nombre valido</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">CUENTA DEBITO:</label>
                                <input type="number" name="ctadebito" onChange={this.cambioValor} value={transaccion.ctadebito} id="ctadebito"
                                    className={((this.verificarError("error_direccion")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese una direccion valida</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">CUENTA CREDITO:</label>
                                <input type="number" name="ctacredito" onChange={this.cambioValor} value={transaccion.ctacredito} id="ctacredito"
                                    className={((this.verificarError("error_telefono")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese un telefono valido</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">MONTO DEBITO:</label>
                                <input type="number" name="montodebito" onChange={this.cambioValor} value={transaccion.montodebito} id="montodebito"
                                    className={((this.verificarError("error_email")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese un correo valido</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">MONTO CREDITO:</label>
                                <input type="number" name="montocredito" onChange={this.cambioValor} value={transaccion.montocredito} id="montocredito"
                                    className={((this.verificarError("error_email")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Ingrese un correo valido</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">ENTIDAD:</label>
                                <input type="number" name="entidadid" onChange={this.cambioValor} value={transaccion.entidadid} id="entidadid"
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