import { useState } from "react";
import { Contador } from "../Contador/Contador";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Heart, HeartFill, Star, StarFill } from "react-bootstrap-icons";
import "./Item.css";

function Item({ nombre, imagen, descripcion, precio, descuento, stock }) {

    const [esFavorito, setEsFavorito] = useState(false);

    const CompraClick = () => {
        // Quiero que se ejecute cuando le doy clic
        alert(`¡Agregaste ${nombre} al chango!`);
    };

    const marcarComoFavorito = () => {
        setEsFavorito(!esFavorito)
    }

    const imagenFinal = imagen?.trim()
        ? imagen
        : "imagenes/imagenNoDisponible.jpg";

    return (
        <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden producto-card">
            {/*Imagen */}
            <div className="position-relative bg-light">
                <Card.Img
                    variant="top"
                    src={imagen}
                    style={{
                        height: "230px",
                        objectFit: "cover"
                    }}
                />
                {/* Favorito */}
                <div className="favorito-btn"
                    onClick={() => setEsFavorito(!esFavorito)}
                >
                    {
                        esFavorito
                            ? <HeartFill className="text-warning" />
                            : <Heart className="text-warning" />
                    }
                </div>
                {/* Badge descuento */}
                <Badge
                    bg="warning"
                    text="dark"
                    className="position-absolute bottom-0 start-0 m-2"
                >
                    {descuento} % OFF
                </Badge>

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
                <h3 className="fw-bold text-dark mb-1">
                    ${precio}
                </h3>
                {/* Stock */}
                <small className="text-muted mb-3">
                    Stock: {stock}
                </small>
                {/* Contador */}
                <Contador stock={stock} />
                {/* Botón comprar */}
                <Button
                    variant="primary"
                    className="w-100 rounded-pill fw-bold"
                    onClick={CompraClick}
                >
                    Comprar
                </Button>
            </Card.Body>
        </Card>
    );
}

export default Item;