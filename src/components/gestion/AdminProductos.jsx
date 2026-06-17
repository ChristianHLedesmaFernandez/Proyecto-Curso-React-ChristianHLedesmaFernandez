import { Button, Badge, Container, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { PencilSquare, Trash } from "react-bootstrap-icons";
import Swal from 'sweetalert2'

// Importaciones clave de Firebase 
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from "../../firebase/config.js"

import ModalProductos from "../productos/ModalProductos.jsx";



function AdminProductos() {

    // Estado para guardar los productos que traigamos de la DB 
    const [productos, setProductos] = useState([]);
    // Para recargar la pagina y que se vea el producto agregado.
    const agregarProducto = (nuevoProducto) => {
        setProductos(prev => [...prev, nuevoProducto]);
    };



    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Para definir el modo del Formulario Editar o Crear
    const [productoEditar, setProductoEditar] = useState(null);



    useEffect(() => {
        if (!navigator.onLine) {
            setError("Sin conexión a Internet");
            setCargando(false);
            return;
        }
        const productosDB = collection(db, "productos nacionales")
        getDocs(productosDB)
            .then((resp) => {
                setProductos(
                    resp.docs.map((doc) => {
                        return { ...doc.data(), id: doc.id }
                    })
                )
                setCargando(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Error al cargar productos");
                setCargando(false);
            });
    }, []);
    // El array vacío asegura que este efecto se ejecute solo una vez return ( <div> <h1>Productos Nacionales</h1>
    if (cargando) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="warning" />
                <p className="mt-3">Cargando productos...</p>
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

    const eliminarProducto = async (id, nombre) => {
        const result = await Swal.fire({
            title: `¿Eliminar "${nombre}"?`,
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar"
        });
        if (result.isConfirmed) {
            const docRef = doc(db, "productos nacionales", id);
            try {
                await deleteDoc(docRef);
                setProductos(
                    productos.filter(prod => prod.id !== id)
                );
                Swal.fire({
                    title: "Eliminado",
                    text: "Producto eliminado correctamente",
                    icon: "success"
                });
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo eliminar el producto",
                    icon: "error"
                });
                console.error(error);
            }
        }
    };

    const editarProducto = (producto) => {
        setProductoEditar(producto);
    };

    const actualizarProducto = (productoActualizado) => {
        setProductos(prev =>
            prev.map(prod =>
                prod.id === productoActualizado.id
                    ? productoActualizado
                    : prod
            )
        );
    };

    return (
        <section id="tablaProductos" className="py-5">
            <Container>
                {/* Comienzo Titulo*/}
                <div className="text-center mb-4">
                    <h2 className="fw-bold display-4">Gestion de <span className="text-primary">Productos</span></h2>
                    <div
                        className="mx-auto bg-primary"
                        style={{ width: '60px', height: '4px', borderRadius: '2px' }}
                    ></div>
                </div>
                {/* Fin Titulo*/}
                <ModalProductos
                    productoEditar={productoEditar}
                    setProductoEditar={setProductoEditar}
                    agregarProducto={agregarProducto}
                    actualizarProducto={actualizarProducto}
                />
                <div className="box-body py-3">
                    {productos.length === 0 ? (
                        <h4 className="text-center py-5">
                            No hay productos cargados.
                        </h4>
                    ) : (
                        <table className="table table-bordered table-hover dt-responsive">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Codigo</th>
                                    <th>Imagen</th>
                                    <th>Categoria</th>
                                    <th>Nombre</th>
                                    <th>Descripcion</th>
                                    <th>Stock</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Aca muestro los productos */}
                                {productos.map((prod, index) => (
                                    <tr key={prod.id} className="align-middle">

                                        <td>{index + 1}</td>
                                        <td>005</td>
                                        <td><img src={prod.imagen} alt={prod.nombre} style={{ width: '80px', height: '80px', objectFit: 'cover' }} /></td>
                                        <td> {prod.categoria} </td>
                                        <td> {prod.nombre} </td>
                                        <td> {prod.descripcion.substring(0, 40)} ... </td>
                                        <td>
                                            <Badge

                                                className="fs-6"
                                                pill
                                                bg={
                                                    prod.stock < 16
                                                        ? "danger"
                                                        : prod.stock < 20
                                                            ? "warning"
                                                            : "success"
                                                }
                                            >
                                                {prod.stock}
                                            </Badge>
                                        </td>
                                        <td> $ {prod.precio.toLocaleString("es-AR")}</td>
                                        {/* Acciones */}
                                        <td className="text-center">
                                            <div className="d-flex gap-2">
                                                <Button
                                                    type='submit'
                                                    variant="outline-warning"
                                                    size="sm"
                                                    onClick={() => editarProducto(prod)}>
                                                    <PencilSquare />
                                                </Button>
                                                <Button
                                                    type='submit'
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => eliminarProducto(prod.id, prod.nombre)}>
                                                    <Trash />
                                                </Button>
                                            </div>
                                        </td>
                                        {/* Fin de Acciones */}
                                    </tr>
                                ))}
                                {/* Fin Mostrar Productos*/}
                            </tbody>
                        </table>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default AdminProductos;