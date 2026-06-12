import { NavLink, useLocation } from "react-router-dom";

import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";
import { useCarrito } from "../../../context/CarritoContext";

import "./NavBar.css";

function NavBar({ mostrarCarrito }) {

    const location = useLocation();
    const esGestion = location.pathname.startsWith("/gestion")

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

                    {!esGestion ? (
                        <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to={"/"} end>Inicio</Nav.Link>
                            <Nav.Link as={NavLink} to={"/productos"}>Productos</Nav.Link>
                            <Nav.Link as={NavLink} to={"/equipo"}>Nosotros</Nav.Link>
                            <Nav.Link as={NavLink} to={"/contacto"}>Contacto</Nav.Link>
                            <Nav.Link as={NavLink} to={"/gestion/dashboard"}>Gestion</Nav.Link>



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
                    ) : (
                        <Nav className="ms-auto">

                            <Nav.Link as={NavLink} to={"/"} end>Volver a la Tienda </Nav.Link>
                            <Nav.Link as={NavLink} to={"/gestion/productos"}> Productos</Nav.Link>
                            <Nav.Link as={NavLink} to={""}> Cupones</Nav.Link>
                            <Nav.Link as={NavLink} to={""}> Equipo</Nav.Link>

                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;