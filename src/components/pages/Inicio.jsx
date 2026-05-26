import { Container, Row, Col, Button } from "react-bootstrap";

import DestacadosContainer from "../productos/DestacadosContainer"; 

function Inicio() {
    return (
        <main className="py-5 bg-light">
            <Container>
                <Row className="align-items-center justify-content-center">
                    <Col md={6} >
                        <h2>Pagina principal </h2>
                        <p>
                            Pre entrega 2026 Christian Horacio Ledesma Fernandez
                        </p>
                        <Button variant="primary">Ingresar</Button>
                    </Col>
                </Row>

                <DestacadosContainer />

            </Container>
        </main>
    );
};

export default Inicio;