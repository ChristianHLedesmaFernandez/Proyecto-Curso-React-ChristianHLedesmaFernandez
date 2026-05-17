import { Outlet, useLocation } from 'react-router-dom';

import Header from './header/Header';
import Footer from './footer/Footer';
import NavBar from './NavBar';
import FooterNosotros from './footer/FooterNosotros';

// Todo lo que pongamos dentro de <Layout> en App.jsx será el "children". 
export function Layout() {
    const location = useLocation();
    return (
        <>
            <Header />
            <NavBar />
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