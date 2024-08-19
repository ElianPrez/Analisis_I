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
            superior: "",
            tipo: "",
            nivel: "",
            cuentascontables: props.cuentascontables,
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
        const { cuentascontables } = this.state;
    const { name, value } = e.target;
    this.setState({
        cuentascontables: {
            ...cuentascontables,
            [name]: value
        }
    });
    }

    verificarError(elemento) {
        return this.state.errores.indexOf(elemento) !== -1;
    }


    enviarDatos = (e) => {
        e.preventDefault();

        const { cuentascontables } = this.state;
        
        var errores = [];
      if (!cuentascontables.codigo || (cuentascontables.codigo && !/^[0-9]*$/.test(cuentascontables.codigo))) errores.push("error_codigo");
        if (!cuentascontables.nombre || (cuentascontables.nombre && !/^[a-zA-Z0-9\s]*$/.test(cuentascontables.nombre))) errores.push("error_nombre");
        if (!cuentascontables.superior || (cuentascontables.superior && !/^[a-zA-Z0-9\s]*$/.test(cuentascontables.superior))) errores.push("error_superior");
        if (!cuentascontables.tipo || (cuentascontables.tipo && !/^[a-zA-Z0-9\s]*$/.test(cuentascontables.tipo))) errores.push("error_tipo");
        if (!cuentascontables.nivel || (cuentascontables.nivel && !/^[0-9]*$/.test(cuentascontables.nivel))) errores.push("error_nivel");
        if(errores.length>0)return false;

        var datosEnviar = {     
            cuentaid: cuentascontables.codigo, 
            nomcuenta: cuentascontables.nombre, 
            superior: cuentascontables.superior, 
            tipo: cuentascontables.tipo, 
            nivel: cuentascontables.nivel };

        
            fetch(`https://localhost:44359/cuentasContables/actualizar/${cuentascontables.codigo}`, {
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
               .finally(() => window.location.href = '/CuentasContables');
            
    }


    render() {

            const { modalAbierto, cuentascontables, enviado } = this.state;
            return (
                <span>
                    <button className="btn btn-primary" onClick={this.toggleModal}>
            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
            </button>
                    <Modal isOpen={modalAbierto} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Editar Cuentas Contables</ModalHeader>
                        <ModalBody>
                            <div className='form-group' onSubmit={this.enviarDatos}>
                                <div className="form-group">
                                    <label htmlFor="">CODIGO:</label>
                                    <input type="number" name="codigo" onChange={this.cambioValor}  disabled value={cuentascontables.codigo} id="codigo"
                                        className={((this.verificarError("error_codigo")) ? "is-invalid" : "") + "form-control"} placeholder="" aria-describedby="helpId" />
                                    <small id="helpId" className="invalid-feedback">Ingrese codigo</small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">Nombre:</label>
                                    <input type="text" name="nombre" onChange={this.cambioValor} value={cuentascontables.nombre} id="nombre"
                                        className={((this.verificarError("error_nombre")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                                    <small id="helpId" className="invalid-feedback">Ingrese NIT valido!</small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">Superior:</label>
                                    <input type="text" name="superior" onChange={this.cambioValor} value={cuentascontables.superior} id="superior"
                                        className={((this.verificarError("error_superior")) ? "is-invalid" : "") + " form-control"} placeholder="" aria-describedby="helpId" />
                                    <small id="helpId" className="invalid-feedback">Ingrese un nombre valido</small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">Tipo:</label>
                                    <select name="tipo" onChange={this.cambioValor} value={cuentascontables.tipo.option} id="tipo"
                                    className={((this.verificarError("error_tipo")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese tipo" aria-describedby="helpId">
                                    <option value="">Seleccione una tipo</option>
                                    <option value="ACTIVO DEUDOR">ACTIVO DEUDOR</option>
                                    <option value="PASIVO ACREEDOR">PASIVO ACREEDOR</option>
                                    <option value="CAPITAL ACREEDOR">CAPITAL ACREEDOR</option>
                                    <option value="INGRESOS ACREEDOR">INGRESOS ACREEDOR</option>
                                    <option value="EGRESOS DEUDOR">EGRESOS DEUDOR</option>
                                    <option value="RESULTADOS DEUDOR">RESULTADOS DEUDOR</option>
                                </select>
                                    <small id="helpId" className="invalid-feedback">Ingrese una direccion valida</small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">Nivel:</label>
                                    <select name="nivel" onChange={this.cambioValor} value={cuentascontables.nivel.option} id="nivel"
                                    className={((this.verificarError("error_nivel")) ? "is-invalid" : "") + " form-control"} placeholder="Ingrese nivel" aria-describedby="helpId">
                                    <option value="">Seleccione una nivel</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                    <small id="helpId" className="invalid-feedback">Ingrese un telefono valido</small>
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