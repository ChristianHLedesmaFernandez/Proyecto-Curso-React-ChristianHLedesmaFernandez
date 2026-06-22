import { Button, Container, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { Trash } from "react-bootstrap-icons";
import Swal from 'sweetalert2'

import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from "../../../firebase/config.js"

import ModalCupones from "./ModalCupones";

function AdminCupones() {
    const [cupones, setCupones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const agregarCupon = (nuevoCupon) => {
        setCupones(prev => [...prev, nuevoCupon]);
    };

    useEffect(() => {
        if (!navigator.onLine) {
            setError("Sin conexión a Internet");
            setCargando(false);
            return;
        }
        const cuponesDB = collection(db, "cupones");
        getDocs(cuponesDB)
            .then((resp) => {
                setCupones(
                    resp.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id
                    }))
                );
                setCargando(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Error al cargar cupones");
                setCargando(false);
            });
    }, []);

    const eliminarCupon = async (id, codigo) => {
        const result = await Swal.fire({
            title: `¿Eliminar "${codigo}"?`,
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar"
        });
        if (result.isConfirmed) {
            const docRef = doc(db, "cupones", id);
            try {
                await deleteDoc(docRef);

                setCupones(
                    cupones.filter(cupon => cupon.id !== id)
                );
                Swal.fire({
                    title: "Eliminado",
                    text: "Cupon eliminado correctamente",
                    icon: "success"
                });
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo eliminar el Cupon",
                    icon: "error"
                });
                console.error(error);
            }
        }
    };

    if (cargando) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="warning" />
                <p className="mt-3">Cargando Cupones...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center py-5">
                <h3>{error}</h3>
            </Container>
        );
    }



    return (
        <section id="tablaCupones" className="py-5">
            <Container>
                {/* Comienzo Titulo*/}
                <div className="text-center mb-4">
                    <h2 className="fw-bold display-4">Gestion de <span className="text-primary">Cupones</span></h2>
                    <div
                        className="mx-auto bg-primary"
                        style={{ width: '60px', height: '4px', borderRadius: '2px' }}
                    ></div>
                </div>
                {/* Fin Titulo*/}
                <ModalCupones agregarCupon={agregarCupon} />
                <div className="box-body py-3">
                    {cupones.length === 0 ? (
                        <h4 className="text-center py-5">
                            No hay cupones cargados.
                        </h4>
                    ) : (
                        <table className="table table-bordered table-hover dt-responsive">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Codigo</th>
                                    <th>Descuento</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cupones.map((cupon, index) => (
                                    <tr key={cupon.id}>
                                        <td>{index + 1}</td>
                                        <td>{cupon.codigo}</td>
                                        <td>{cupon.descuento}%</td>
                                        <td>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => eliminarCupon(cupon.id, cupon.codigo)}>
                                                <Trash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </Container>
        </section>
    );
};
export default AdminCupones;
