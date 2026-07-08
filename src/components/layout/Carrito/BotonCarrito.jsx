import { Button, Badge } from "react-bootstrap";
import { Cart3 } from "react-bootstrap-icons";
import { useCarrito } from "../../../context/CarritoContext";
import "./Carrito.css"

const BotonCarrito = ({ mostrarCarrito }) => {

    const { carrito } = useCarrito();
    const cantidadCarrito = carrito.reduce((acumulador, prod) =>
        acumulador + prod.cantidad,
        0
    );

    return (


        <Button className="position-relative ms-3 text-white"
                variant="link"
                onClick={mostrarCarrito}
        >
            <div className="carrito-container">
                <Cart3 size={30} />
                {/* numero sobre el carrito */}
                <Badge
                    pill
                    bg="danger"
                    className="
                        position-absolute
                        top-0
                        start-100
                        translate-middle"
                >
                    {cantidadCarrito}
                </Badge>
            </div>
        </Button >

    );
}

export default BotonCarrito;