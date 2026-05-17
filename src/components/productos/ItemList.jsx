//import Item from "../Item/Item";
import Item from "./Item";
import { Col, Row } from "react-bootstrap";

function ItemList({ productos }) {
    return (
        <Row className="g-4">
            {productos.map(prod => (

                <Col key={prod.id} xs={12} md={6} lg={3}>
                    <Item {...prod} />
                </Col>

            ))}
        </Row>
    );

}


export default ItemList