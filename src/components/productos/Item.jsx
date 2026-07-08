import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";

import "./Item.css";

import { Contador } from "../Contador/Contador";
import { CarritoContext } from "../../context/CarritoContext";

function Item({ id, nombre, imagen, descripcion, precio, descuento, stock, destacados }) {

    // Para el Carrito de Compras 
    const { agregarAlCarrito } = useContext(CarritoContext);
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);


    const [esFavorito, setEsFavorito] = useState(false);
    const navigate = useNavigate();

    const CompraClick = (e) => {

        e.preventDefault();
        e.stopPropagation();
        // Ahora agregamos al carrito
        agregarAlCarrito({
                    id,
                    nombre,
                    imagen,
                    cantidad: cantidadSeleccionada,
                    stock,
                    descuento,
                    precio 
        });
    };

    const marcarComoFavorito = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setEsFavorito(!esFavorito)
    }

    const imagenFinal = imagen?.trim()
        ? imagen
        : "imagenes/imagenNoDisponible.jpg";

    return (
        <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden producto-card" onClick={() => navigate(`/producto/${id}`)}>
            {/*Imagen */}
            <div className="position-relative bg-light">
                <Card.Img
                    variant="top"
                    src={imagenFinal}
                    style={{
                        height: "230px",
                        objectFit: "cover"
                    }}
                />
                {/* Favorito */}
                <div className="favorito-btn"
                    onClick={marcarComoFavorito}
                >
                    {
                        esFavorito
                            ? <HeartFill className="text-warning" />
                            : <Heart className="text-warning" />
                    }
                </div>
                {/* Badge descuento */}
                {descuento > 0 && (
                    <Badge
                        bg="warning"
                        text="dark"
                        className="position-absolute bottom-0 start-0 m-2"
                    >
                        {descuento} % OFF
                    </Badge>
                )}

            </div>
            <Card.Body>
                {/* Nombre */}
                <Card.Title
                    className="fw-bold mb-1"
                    style={{ fontSize: "1.3rem" }}
                >
                    {nombre}
                </Card.Title>
                {/* Precio */}
                {!destacados && (
                    <>
                        <h3 className="fw-bold text-dark mb-1">
                            ${precio}
                        </h3>
                        {/* Stock */}
                        <small className="text-muted mb-3">
                            Stock: {stock}
                        </small>
                        {/* Contador */}
                        <Contador 
                            stock={stock}
                            cantidad={cantidadSeleccionada}
                            setCantidad={setCantidadSeleccionada} 
                        />
                        {/* Botón comprar */}
                        <Button
                            variant="primary"
                            className="w-100 rounded-pill fw-bold"
                            onClick={CompraClick}
                        >
                            Agregar al Carrito
                        </Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}

export default Item;