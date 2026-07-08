import { useNavigate } from "react-router-dom";

import { Button, Container, Row, Col, Form } from "react-bootstrap";

import { useAuth } from "../../../context/AuthContext"
import BotonCarrito from "../Carrito/BotonCarrito";

function Header({ mostrarCarrito }) {

    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return (
        <header className="bg-primary text-white py-1 shadow-sm">
            <Container fluid className="px-4">
                <Row className="align-items-center">
                    <Col xs={12} md={4} className="mb-3 mb-md-0">
                        {/* Buscador */}
                        <Form.Control
                            type="text"
                            placeholder="Buscar productos..."
                            className="w-100"
                        />
                    </Col>
                    <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
                        {/* Logo */}

                        <h1 className="">Pre-Entrega "Ecommerce"</h1>
                        <p className="lead mb-0">Pre entrega Christian Horacio Ledesma Fernandez</p>
                    </Col>

                    <Col
                        xs={12}
                        md={4}
                        className="d-flex justify-content-center justify-content-md-end align-items-center gap-2 flex-wrap" >
                        {/* Usuario */}
                        {user ? (
                            <>
                                <span   className="text-truncate"
                                        style={{ maxWidth: "180px" }}>
                                    {user.email}
                                </span>

                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    onClick={logout}
                                >
                                    Cerrar sesión
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="outline-light"
                                size="sm"
                                onClick={() => navigate("/login")}
                            >
                                Iniciar sesión
                            </Button>
                        )}
                        {/* Carrito */}
                        <BotonCarrito mostrarCarrito={mostrarCarrito} />
                    </Col>


                </Row>
            </Container>
        </header>
    );
};
export default Header;

