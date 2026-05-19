import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { Container, Card, Row, Col, Spinner, Badge, Button} from 'react-bootstrap';

const ProductoDetalle = () => {

    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/data/productos.json')
            //fetch('https://proyecto-nodejs-tau.vercel.app/api/productos') // Dessde mi API (del curso de Node JS)
            .then(res => {
                if (!res.ok) throw new Error('Error al cargar');                
                return res.json();
            })
            .then(data => {
                const productoEncontrado = data.find(p => p.id === parseInt(id)); 
                setProducto(productoEncontrado);
                setCargando(false);
            })
            .catch(err => {
                setError(err.message);
                setCargando(false);
            });
    }, [id]);


    if (cargando) return <Spinner animation="border" variant="warning" />;

    if (error) return <p>Error: {error}</p>;


    if (!producto) return <p>Producto no encontrado</p>;
    return (
    <Container className="py-5">

<div
    className="mb-4 text-primary fw-semibold"
    style={{ cursor: "pointer" }}
    onClick={() => navigate("/productos")}
>
    ← Volver a productos
</div>


        <Card className="border-0 shadow-lg rounded-4 overflow-hidden">

            <Row className="g-0">

                {/* Imagen */}
                <Col md={6} className="bg-light d-flex align-items-center justify-content-center p-4">

                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="img-fluid rounded-4"
                        style={{
                            maxHeight: "450px",
                            objectFit: "contain"
                        }}
                    />

                </Col>

                {/* Información */}
                <Col md={6}>

                    <Card.Body className="p-4 p-lg-5">

                        <Badge
                            bg="warning"
                            text="dark"
                            className="mb-3 px-3 py-2 rounded-pill"
                        >
                            Detalle del Producto
                        </Badge>

                        <h1 className="fw-bold mb-3">
                            {producto.nombre}
                        </h1>

                        <p className="text-muted fs-5">
                            {producto.descripcion}
                        </p>

                        <h2 className="fw-bold text-primary my-4">
                            ${producto.precio}
                        </h2>

                        <p className="mb-4">
                            <strong>Stock disponible:</strong> {producto.stock}
                        </p>

                        <Button
                            variant="primary"
                            size="lg"
                            className="rounded-pill px-4 fw-bold"
                        >
                            Agregar al carrito
                        </Button>

                    </Card.Body>

                </Col>

            </Row>

        </Card>

    </Container>
    );
};
export default ProductoDetalle;