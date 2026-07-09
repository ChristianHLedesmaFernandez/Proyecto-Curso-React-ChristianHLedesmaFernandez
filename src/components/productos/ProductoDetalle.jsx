import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { Container, Card, Row, Col, Spinner, Badge, Button } from 'react-bootstrap';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config.js';

import { Helmet } from "react-helmet-async";

import { useCarrito } from "../../context/CarritoContext";

const ProductoDetalle = () => {

    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    //Para el carrito
    const { agregarAlCarrito } = useCarrito();

    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                const docRef = doc(
                    db,
                    "productos nacionales",
                    id
                );
                const resp = await getDoc(docRef);

                if (resp.exists()) {
                    setProducto({
                        id: resp.id,
                        ...resp.data()
                    });
                } else {
                    setProducto(null);
                }
            } catch (error) {
                console.error(error);
                setError("Error al cargar producto");
            } finally {
                setCargando(false);
            }
        };
        obtenerProducto();
    }, [id]);

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
    if (!producto) {
        return (
            <Container className="text-center py-5">
                <h3>Producto no encontrado</h3>
            </Container>
        );
    }
    
    return (
        <>
            <Helmet>
                
                <title>{producto.nombre + "| TechStore"}</title>
                <meta
                    name="description"
                    content={producto.descripcion}
                />
            </Helmet>
            <Container className="py-5">
                <div
                    className="mb-4 text-primary fw-semibold"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(-1)}
                >
                    ← Volver
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
                                    onClick={() =>
                                        agregarAlCarrito({
                                            id: producto.id,
                                            nombre: producto.nombre,
                                            imagen: producto.imagen,
                                            precio: producto.precio,
                                            descuento: producto.descuento,
                                            stock: producto.stock,
                                            cantidad: 1
                                        })
                                    }
                                >
                                    Agregar al carrito
                                </Button>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </>
    );
};

export default ProductoDetalle;