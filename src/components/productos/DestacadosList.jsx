import Item from "./Item";
import { Row, Col, Spinner, Carousel } from 'react-bootstrap';

function DestacadosList({ productos }) {

    const cantidadDestacados = 5;  // Cantidad de numeros a destacar
    const productosPorSlide = 3;

    const productosDestacados = [...productos].sort((a, b) => b.descuento - a.descuento).slice(0, cantidadDestacados);
    // Agrupar productos
    const grupos = [];
    for (let i = 0; i < productosDestacados.length; i += productosPorSlide) {
        grupos.push(
            productosDestacados.slice(i, i + productosPorSlide)
        );
    }

    return (
        <Carousel indicators={true} controls={false} interval={5000} pause="hover">
            {grupos.map((grupo, index) => (
                <Carousel.Item key={index}>
                    <Row className="g-4 justify-content-center pb-4 px-4 pb-5">
                        {grupo.map(prod => (
                            <Col key={prod.id} xs={12} md={6} lg={4}>
                                <Item {...prod}
                                    destacados={true} />
                            </Col>
                        ))}
                    </Row>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default DestacadosList