import React, { useState, useEffect } from "react";

import FormularioProducto from "./FormularioProducto";
import { Form, Button, Modal } from "react-bootstrap";

import Swal from 'sweetalert2'

import { collection, doc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from "../../firebase/config.js"

import {
    validarNombreProducto,
    validarCategoria,
    validarDescripcion,
    validarStock,
    validarDescuento,
    validarPrecio
} from "../../js/funciones.js";

function ModalProductos({ productoEditar, setProductoEditar, agregarProducto, actualizarProducto }) {
    // Para determinar si estoy Editando o Creando
    const modoEdicion = productoEditar !== null;


    const [datosForm, setDatosForm] = useState({
        nombre: "",
        categoria: "",
        descripcion: "",
        stock: "",
        descuento: "",
        precio: ""
    });

    useEffect(() => {
        if (productoEditar) {
            setDatosForm({
                nombre: productoEditar.nombre || "",
                descripcion: productoEditar.descripcion || "",
                categoria: productoEditar.categoria || "",
                stock: productoEditar.stock  ?? "",
                descuento: productoEditar.descuento ?? "",
                precio: productoEditar.precio  ?? ""
            });

            setShow(true);
        }

    }, [productoEditar]);

    // Nuevo estado para el archivo de imagen 
    const [imagenFile, setImagenFile] = useState(null);

    const validadores = {
        nombre: validarNombreProducto,
        categoria: validarCategoria,
        descripcion: validarDescripcion,
        stock: validarStock,
        descuento: validarDescuento,
        precio: validarPrecio
    };
    const [show, setShow] = useState(false);

    const cancelar = () => {
        setShow(false);
        setProductoEditar(null);
        setDatosForm({
            nombre: "",
            descripcion: "",
            categoria: "",
            stock: "",
            descuento: "",
            precio: ""
        });

        setImagenFile(null);
        setErrores({});

    };

    const handleShow = () => {
        setShow(true);
        setErrores({});
        setDatosForm({
            nombre: "",
            descripcion: "",
            categoria: "",
            stock: "",
            descuento: "",
            precio: ""
        });

        setImagenFile(null)
    };

    const [loading, setLoading] = useState(false);
    
    // Manejo de Errores
    const [errores, setErrores] = useState({});

    const formValido =
        validarNombreProducto(datosForm.nombre) === "" &&
        validarDescripcion(datosForm.descripcion) === "" &&
        validarCategoria(datosForm.categoria) === "" &&
        validarStock(datosForm.stock) === "" &&
        validarPrecio(datosForm.precio) === "" &&
        validarDescuento(datosForm.descuento) === "" &&
        (modoEdicion || imagenFile !== null);

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

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };

    const guardarProducto = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (modoEdicion) {
            // Estoy Editando un Producto
            try {
                const docRef = doc(db, "productos nacionales", productoEditar.id);
                await updateDoc(docRef, {
                    nombre: datosForm.nombre,
                    categoria: datosForm.categoria,
                    descripcion: datosForm.descripcion,
                    stock: Number(datosForm.stock),
                    descuento: datosForm.descuento === ""
                        ? 0
                        : Number(datosForm.descuento),
                    precio: Number(datosForm.precio)
                });


                const productoActualizado = {
                    ...productoEditar,
                    ...datosForm,
                    stock: Number(datosForm.stock),
                    descuento: datosForm.descuento === ""
                        ? 0
                        : Number(datosForm.descuento),
                    precio: Number(datosForm.precio)
                };

                actualizarProducto(productoActualizado);

                Swal.fire({
                    title: "Producto actualizado",
                    icon: "success"
                });

                cancelar();
            } catch (error) {

                console.error(error);

                Swal.fire({
                    title: "Error",
                    text: "No se pudo actualizar el producto",
                    icon: "error"
                });

            } finally {

                setLoading(false);

            }
        } else {
            // Estoy Creando un Producto
            if (!imagenFile) {
                setLoading(false);
                Swal.fire({
                    title: "Por favor, selecciona una imagen para el producto.",
                    icon: "error",
                    draggable: true
                });
                return;
            }
            // --- Lógica para subir la imagen a Imgbb --- 
            const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
            const formData = new FormData();
            formData.append('image', imagenFile);
            try {
                console.log("Subiendo imagen a Imgbb...");
                const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });
                const datosImgbb = await respuestaImgbb.json();
                if (datosImgbb.success) {
                    console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);
                    // Unimos la URL de la imagen con el resto de los datos del formulario 
                    const productoCompleto = {
                        ...datosForm,
                        // Agregamos la URL obtenida 
                        imagen: datosImgbb.data.url,
                        stock: Number(datosForm.stock),
                        descuento: datosForm.descuento === ""
                            ? 0
                            : Number(datosForm.descuento),
                        precio: Number(datosForm.precio)
                    };
                    // Guardando en Firestore
                    const productosRef = collection(db, "productos nacionales");
                    const docCreado = await addDoc(productosRef, productoCompleto);
                    // Para recargar la pagina
                    agregarProducto({
                        ...productoCompleto,
                        id: docCreado.id
                    });
                    Swal.fire({
                        title: "El Producto se guardo Correctamente!",
                        icon: "success",
                        draggable: true
                    });
                    cancelar();
                } else {
                    throw new Error('La subida de la imagen a Imgbb falló.');
                }
            } catch (error) {
                console.error("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
                Swal.fire({
                    title: "Hubo un error al subir la imagen. Por favor, intentá de nuevo.",
                    icon: "error",
                    draggable: true
                });
            } finally {
                setLoading(false);
            }



        }
    };

    return (
        <>
            < div className="text-start mb-4" >
                <Button variant="primary" onClick={handleShow}>
                    Nuevo Producto
                </Button>
            </div >
            < Modal show={show} onHide={cancelar} size="lg">
                <Form className="text-start" onSubmit={guardarProducto} noValidate>
                    <Modal.Header className="bg-primary text-white">
                        <Modal.Title>{modoEdicion ? "Editar Producto" : "Nuevo Producto"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormularioProducto
                            datosForm={datosForm}
                            manejarCambios={manejarCambios}
                            manejarCambioImagen={manejarCambioImagen}
                            guardarProducto={guardarProducto}
                            errores={errores}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cancelar}>
                            Cancelar
                        </Button>
                        <Button variant="primary" disabled={!formValido || loading}>
                            {loading ? "Guardando..." : modoEdicion ? "Guardar Cambios" : "Guardar Producto"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal >

        </>
    );
};

export default ModalProductos;