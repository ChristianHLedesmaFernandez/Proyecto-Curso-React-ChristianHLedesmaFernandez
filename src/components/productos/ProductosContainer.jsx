import React, { useState, useEffect } from "react";

import { Container, Spinner } from 'react-bootstrap';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config.js';

import ItemList from "./ItemList";
import ModalProductos from "./ModalProductos";

function ProductosContainer() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
/*    Cargando desde un Archivo.
    useEffect(() => {
        fetch('data/productos.json')
            //fetch('https://proyecto-nodejs-tau.vercel.app/api/productos') // Dessde mi API (del curso de Node JS)
            .then(res => {
                if (!res.ok) throw new Error('Error al cargar');
                return res.json();
            })
            .then(data => {
                setProductos(data);
                setCargando(false);
            })
            .catch(err => {
                setError(err.message);
                setCargando(false);
            });
    }, []);
*/
/* Cargando desde Firestore */
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

    return (
        <section id="productos" className="py-5">
            <Container className="mt-0">
                {/* Comienzo Titulo*/}
                <div className="text-center mb-4">
                    <h2 className="fw-bold display-4">Nuestros <span className="text-primary">Productos</span></h2>
                    <div
                        className="mx-auto bg-primary"
                        style={{ width: '60px', height: '4px', borderRadius: '2px' }}
                    ></div>
                    <p className="text-black mt-1">
                        Conoce nuestros productos.
                    </p>
                </div>
                {/* Fin Titulo*/}
                <ItemList productos={productos} />
            </Container>
        </section>
    );
}

export default ProductosContainer;