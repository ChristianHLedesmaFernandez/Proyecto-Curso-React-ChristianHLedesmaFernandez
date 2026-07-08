import { NavLink, useLocation } from "react-router-dom";

import { Navbar, Nav, Container } from "react-bootstrap";
import { Cart3 } from "react-bootstrap-icons";

import { useCarrito } from "../../../context/CarritoContext";
import { useAuth } from "../../../context/AuthContext"

import "./NavBar.css";

function NavBar() {

    const { user } = useAuth();

    const location = useLocation();
    const esGestion = location.pathname.startsWith("/gestion")

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
                            {user && (
                                <Nav.Link as={NavLink} to={"/gestion/dashboard"}>Gestion</Nav.Link>  
                                )}
                        </Nav>
                    ) : (
                        <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to={"/"} end>Volver a la Tienda </Nav.Link>
                            <Nav.Link as={NavLink} to={"/gestion/productos"}> Productos</Nav.Link>
                            <Nav.Link as={NavLink} to={"/gestion/cupones"}> Cupones</Nav.Link>
                            <Nav.Link as={NavLink} to={""}> Equipo</Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;