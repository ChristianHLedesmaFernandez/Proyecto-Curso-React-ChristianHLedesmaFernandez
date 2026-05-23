import React, { useState, useEffect } from "react";

import { Container, Row, Col, Spinner, Carousel} from 'react-bootstrap';

import DestacadosList from "./DestacadosList";

function DestacadosContainer() {
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
                <div className="text-center mb-5">
                    <h2 className="fw-bold display-4">Productos <span className="text-primary">Destacados</span></h2>
                    <div
                        className="mx-auto bg-primary"
                        style={{ width: '60px', height: '4px', borderRadius: '2px' }}
                    ></div>
                    <p className="text-black mt-1">
                        Mira nuestros Productos destacados.
                    </p>
                </div>
                {/* Fin Titulo*/}              
                <DestacadosList productos={productos} />
            </Container>
        </section>
    );
}

export default DestacadosContainer;