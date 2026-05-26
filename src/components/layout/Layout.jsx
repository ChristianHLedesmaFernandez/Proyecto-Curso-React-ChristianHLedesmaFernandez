import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

import Header from './header/Header';
import NavBar from './header/NavBar';
import Footer from './footer/Footer';
import FooterNosotros from './footer/FooterNosotros';
import Carrito from './Carrito/Carrito';

// Todo lo que pongamos dentro de <Layout> en App.jsx será el "children". 
export function Layout() {

    const [showCarrito, setShowCarrito] = useState(false);

    
    const cerrarCarrito = () => setShowCarrito(false);
    const mostrarCarrito = () => setShowCarrito(true);

    const location = useLocation();
    return (
        <>
            <Header />
            <NavBar mostrarCarrito={mostrarCarrito} />
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