import React, { useState, useEffect } from "react";

import { Container, Row, Col, Spinner, Carousel} from 'react-bootstrap';

import ItemList from "./ItemList";
import ModalProductos from "./ModalProductos";

function ProductosContainer() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

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

    if (cargando) return <Spinner animation="border" variant="warning" />;

    if (error) return <p>Error: {error}</p>; 

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
                <ModalProductos />
                <ItemList productos={productos} />
            </Container>
        </section>
    );
}

export default ProductosContainer;