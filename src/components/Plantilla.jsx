import { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Heart, HeartFill } from "bootstrap-icons";

function Item({ nombre, imagen, descripcion, precio, stock }) {

    const [cantidad, setCantidad] = useState(0);
    const [favorito, setFavorito] = useState(false);

    const sumar = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1);
        }
    };

    const restar = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);
        }
    };

    const comprar = () => {
        alert(`Agregaste ${cantidad} ${nombre} al carrito`);
    };

    return (
        <Card
            className="h-100 shadow-sm border-0 rounded-4 overflow-hidden producto-card"
        >

            {/* Imagen */}
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
                <div
                    onClick={() => setFavorito(!favorito)}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer",
                        fontSize: "1.4rem",
                        color: "#0d6efd"
                    }}
                >
                    {
                        favorito
                            ? <HeartFill />
                            : <Heart />
                    }
                </div>

                {/* Badge descuento */}
                <Badge
                    bg="warning"
                    text="dark"
                    className="position-absolute bottom-0 start-0 m-2"
                >
                    15% OFF
                </Badge>

            </div>

            <Card.Body className="d-flex flex-column">

                {/* Nombre */}
                <Card.Title
                    className="fw-bold mb-1"
                    style={{ fontSize: "1.3rem" }}
                >
                    {nombre}
                </Card.Title>

                {/* Descripción */}
                <Card.Text
                    className="text-muted mb-2"
                    style={{
                        fontSize: "0.95rem",
                        minHeight: "45px"
                    }}
                >
                    {descripcion}
                </Card.Text>

                {/* Precio */}
                <h3 className="fw-bold text-dark mb-1">
                    ${precio}
                </h3>

                {/* Cuotas */}
                <p
                    className="text-success fw-semibold mb-2"
                    style={{ fontSize: "0.9rem" }}
                >
                    6 cuotas sin interés
                </p>

                {/* Stock */}
                <small className="text-muted mb-3">
                    Stock: {stock}
                </small>

                {/* Contador */}
                <div className="d-flex align-items-center justify-content-center gap-2 mb-3">

                    <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={restar}
                    >
                        -
                    </Button>

                    <span className="fw-bold fs-5">
                        {cantidad}
                    </span>

                    <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={sumar}
                    >
                        +
                    </Button>

                </div>

                {/* Botón comprar */}
                <Button
                    variant="primary"
                    className="w-100 rounded-pill fw-bold"
                    onClick={comprar}
                >
                    Comprar
                </Button>

            </Card.Body>
        </Card>
    );
}

export default Item;