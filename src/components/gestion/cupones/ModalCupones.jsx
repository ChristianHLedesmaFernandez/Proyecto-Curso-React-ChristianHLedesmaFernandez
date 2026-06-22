import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import Swal from 'sweetalert2'
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/config.js";
import FormularioCupon from "./FormularioCupon";

import {
    validarDescuento,
    validarCodigoCupon
} from "../../../js/funciones.js"


function ModalCupones({ agregarCupon }) {

    const [datosForm, setDatosForm] = useState({
        codigo: "",
        descuento: ""
    });
    const [show, setShow] = useState(false);
    
    const handleShow = () => {
        setShow(true);
        setErrores({});
        setDatosForm({
            codigo: "",
            descuento: ""
        });
    };

    const cancelar = () => {
        setShow(false);
        setDatosForm({
            codigo: "",
            descuento: ""
        });
        setErrores({});
    };

    const [loading, setLoading] = useState(false);
    // Manejo de Errores
    const [errores, setErrores] = useState({});
    const manejarCambios = (e) => {
        const { name, value } = e.target;
        setDatosForm(prev => ({
            ...prev,
            [name]: value
        }));
        setErrores(prev => ({
            ...prev,
            [name]: validadores[name](value)
        }));
    };

    const validadores = {
        codigo: validarCodigoCupon,
        descuento: validarDescuento
    };

    const formValido =
        validarCodigoCupon(datosForm.codigo) === "" &&
        validarDescuento(datosForm.descuento) === "";

    const guardarCupon = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const cuponesRef = collection(db, "cupones");
            const docCreado = await addDoc(cuponesRef, {
                codigo: datosForm.codigo.trim().toUpperCase(),
                descuento: Number(datosForm.descuento)
            });
            agregarCupon({
                id: docCreado.id,
                codigo: datosForm.codigo.trim().toUpperCase(),
                descuento: Number(datosForm.descuento)
            });
            cancelar();
            Swal.fire({
                title: "Cupón guardado",
                icon: "success"
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "No se pudo Guardar el Cupon",
                icon: "error"
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            < div className="text-start mb-4" >
                <Button variant="primary" onClick={handleShow}>
                    Nuevo Cupon
                </Button>
            </div >
            < Modal show={show} onHide={cancelar} size="lg">
                <Form className="text-start" onSubmit={guardarCupon} noValidate>
                    <Modal.Header className="bg-primary text-white">
                        <Modal.Title>Nuevo Cupon</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormularioCupon
                            datosForm={datosForm}
                            manejarCambios={manejarCambios}
                            errores={errores}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cancelar}>
                            Cancelar
                        </Button>
                        <Button variant="primary" disabled={!formValido || loading}>
                            {loading ? "Guardando..." : "Guardar Cupon"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal >
        </>
    );
};

export default ModalCupones;