import { Container, Row, Col, Button } from "react-bootstrap";
import TarjetaContacto from "../equipo/TarjetaContacto";
import DirectorioFooter from "../equipo/DirectorioFooter";
import Directorio from "../equipo/Directorio";
import Contacto from "../contactos/Contacto"; 
import ProductosContainer from "../productos/ProductosContainer";

import ItemListContainer from "../productos/ItemListContainer";

function Inicio() {
    return(        
        <main className="py-5 bg-light">            
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <h2>Pagina principal </h2>
                        <p>
                            Pre entrega 2026 Christian Horacio Ledesma Fernandez
                        </p>
                        <Button variant="primary">Ingresar</Button>
                    </Col>
                    <Col mb={6}>
                    <img src="https://picsum.photos/600/400" className="img-fluid rounded shadow" />
                    </Col>
                </Row>
            </Container>            
        </main>        
    );
};

export default Inicio;