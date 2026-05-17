import { Link } from "react-router-dom";

import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";

function NavBar() {

    const cantidadCarrito = 3;

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>Talento Tech 2026</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="ms-auto">

                        <Nav.Link as={Link} to={"/"}>Inicio</Nav.Link>
                        <Nav.Link as={Link} to={"/productos"}>Productos</Nav.Link>
                        <Nav.Link as={Link} to={"/equipo"}>Nosotros</Nav.Link>
                        <Nav.Link as={Link} to={"/contacto"}>Contacto</Nav.Link>

                        {/* carrito */}
                        <Nav.Link className="position-relative ms-3">
                            <Cart size={25} />
                            <Badge
                                pill
                                bg="danger"
                                className="
                                    position-absolute
                                    top-0
                                    start-100
                                    translate-middle
                                "
                            >
                                {cantidadCarrito}
                            </Badge>
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;