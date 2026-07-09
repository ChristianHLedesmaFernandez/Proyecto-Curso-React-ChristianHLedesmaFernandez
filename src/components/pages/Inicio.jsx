import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { Container, Row, Col, Button } from "react-bootstrap";

import DestacadosContainer from "../productos/DestacadosContainer";

function Inicio() {

    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>Inicio | TechStore</title>
                <meta
                    name="description"
                    content="Tienda online de tecnología con los mejores productos al mejor precio."
                />
            </Helmet>            
            <main className="py-5 bg-light">
                <Container>
                    <Row className="align-items-center justify-content-center">
                        <Col md={6} >
                            <h2>Pagina principal </h2>
                            <p>
                                Pre entrega 2026 Christian Horacio Ledesma Fernandez
                            </p>
                            <Button
                                variant="primary"
                                onClick={() => navigate("/login")}
                            >
                                Ingresar
                            </Button>
                        </Col>
                    </Row>

                    <DestacadosContainer />

                </Container>
            </main>
        </>
    );
};

export default Inicio;