import { useState } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import FormularioContacto from "./FormularioContacto";

import { validarNombre, validarEmail, validarTelefono, validarMensaje } from '../../js/funciones';

import Swal from 'sweetalert2'


function Contactos() {

    const [datosForm, setDatosForm] = useState({
        nombre: '',
        email: "",
        telefono: "",
        mensaje: ""
    });

    // Manejo de errores
    const [errores, setErrores] = useState({});
    const [touched, setTouched] = useState({}); // Cuando paso por un campo

    const validadores = {
        nombre: validarNombre,
        email: validarEmail,
        telefono: validarTelefono,
        mensaje: validarMensaje
    };

    const manejarCambios = (e) => {
        const { name, value } = e.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
        // validar mientras escribe
        const error = validadores[name](value);

        // actualizar error
        setErrores({
            ...errores,
            [name]: error
        });
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        // Manejo de Errores
        const nuevosErrores = {
            nombre: validarNombre(datosForm.nombre),
            email: validarEmail(datosForm.email),
            telefono: validarTelefono(datosForm.telefono),
            mensaje: validarMensaje(datosForm.mensaje)
        };
        setErrores(nuevosErrores);
        const formularioValido = Object.values(nuevosErrores)
            .every(error => error === "");
        if (!formularioValido) return;
        // Fin Manejo de Errores
        console.log(datosForm);
        Swal.fire({
            title: "El Mensaje se envio Correctamente!",
            icon: "success",
            draggable: true
        });
        setDatosForm({
            nombre: '',
            email: "",
            telefono: "",
            mensaje: "",
        });
    };

    const manejarBlur = (e) => {
        const { name, value } = e.target;
        setTouched({
            ...touched,
            [name]: true
        });
        let error = "";
        switch (name) {
            case "nombre":
                error = validarNombre(value);
                break;
            case "email":
                error = validarEmail(value);
                break;
            case "telefono":
                error = validarTelefono(value);
                break;
            case "mensaje":
                error = validarMensaje(value);
                break;
            default:
                break;
        }
        setErrores({
            ...errores,
            [name]: error
        });
    };


    return (
        <section id="contactos" className="py-5">
            <Container className="py-5">
                {/* Comienzo Titulo*/}
                <div className="text-center mb-4">
                    <h2 className="fw-bold display-4">Contactese con <span className="text-primary">Nosotros</span></h2>
                    <div
                        className="mx-auto bg-primary"
                        style={{ width: '60px', height: '4px', borderRadius: '2px' }}
                    ></div>
                </div>
                {/* Fin Titulo*/}
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">

                                <FormularioContacto
                                    datosForm={datosForm}
                                    manejarCambios={manejarCambios}
                                    manejarEnvio={manejarEnvio}
                                    manejarBlur={manejarBlur}
                                    errores={errores}
                                    touched={touched}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >
        </section>
    );
};

export default Contactos;