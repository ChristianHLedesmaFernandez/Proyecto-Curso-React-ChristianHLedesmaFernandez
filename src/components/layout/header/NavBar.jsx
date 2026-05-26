import { NavLink } from "react-router-dom";

import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";
import "./NavBar.css";
import { useCarrito } from "../../../context/CarritoContext";

function NavBar({ mostrarCarrito }) {

    const { carrito } = useCarrito();
    const cantidadCarrito = carrito.reduce((acumulador, prod) =>
        acumulador + prod.cantidad,
        0
    );

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>Talento Tech 2026</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="ms-auto">

                        <Nav.Link as={NavLink} to={"/"} end>Inicio</Nav.Link>
                        <Nav.Link as={NavLink} to={"/productos"}>Productos</Nav.Link>
                        <Nav.Link as={NavLink} to={"/equipo"}>Nosotros</Nav.Link>
                        <Nav.Link as={NavLink} to={"/contacto"}>Contacto</Nav.Link>

                        {/* carrito */}
                        <Nav.Link className="position-relative ms-3"
                            onClick={mostrarCarrito}
                        >
                            <div className="carrito-container">
                                <Cart size={25} />
                                {/* numero sobre el carrito */}
                                <Badge
                                    pill
                                    bg="danger"
                                    className="
                                        position-absolute
                                        top-0
                                        start-100
                                        translate-middle"
                                >
                                    {cantidadCarrito}
                                </Badge>
                            </div>
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;