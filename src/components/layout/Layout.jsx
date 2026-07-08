import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Container, Spinner } from "react-bootstrap";

import Header from './header/Header';
import NavBar from './header/NavBar';
import Footer from './footer/Footer';
import FooterNosotros from './footer/FooterNosotros';
import Carrito from './Carrito/Carrito';
import { useAuth } from "../../context/AuthContext";

// Todo lo que pongamos dentro de <Layout> en App.jsx será el "children". 
export function Layout() {
    
    const { loading } = useAuth();

    const [showCarrito, setShowCarrito] = useState(false);


    const cerrarCarrito = () => setShowCarrito(false);
    const mostrarCarrito = () => setShowCarrito(true);

    const location = useLocation();

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="warning" />
                <p className="mt-3">Cargando...</p>
            </Container>
        );
    }
    return (
        <>
            <Header mostrarCarrito={mostrarCarrito} />
            <NavBar />
            <Carrito show={showCarrito}
                handleClose={cerrarCarrito}
            />
            <main>
                <Outlet />
            </main>
            {
                location.pathname === "/equipo"
                    ? <FooterNosotros />
                    : <Footer />
            }
        </>);
}

export default Layout;