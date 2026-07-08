//import React from "react";
import { Container } from "react-bootstrap";

import DirectorioFooter from "../../equipo/DirectorioFooter";

function Footer() {
    return (
        
        <footer className="bg-black text-white text-center py-3 mt-5">
            <DirectorioFooter />
            <Container fluid className="px-4">
                <p className="mb-0"> Christian H. Ledesma Fernandez 2026 - Derechos Reservados - Version: 1.0.0</p>
            </Container>
        </footer>

    );
};

export default Footer;