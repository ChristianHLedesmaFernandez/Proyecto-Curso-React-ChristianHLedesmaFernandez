
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Cart, Trash, ArrowDown, ArrowUp } from "react-bootstrap-icons";
import { Button } from 'react-bootstrap';

import "./Carrito.css"

import { useCarrito } from '../../../context/CarritoContext';

function Carrito({ show, handleClose }) {

    const { carrito,
        eliminarProducto,
        incrementarCantidad,
        disminuirCantidad,
        vaciarCarrito
    } = useCarrito();

    const subtotalSinDescuento = carrito.reduce(
        (acc, prod) => acc + (prod.precio * prod.cantidad), 0
    );

    const subtotalConDescuento = carrito.reduce((acc, prod) => {
        const precioConDescuento =
            prod.precio - (prod.precio * prod.descuento / 100);
        return acc + (precioConDescuento * prod.cantidad);
    }, 0);

    const subtotal = subtotalSinDescuento;
    const descuento = subtotalSinDescuento - subtotalConDescuento;

    const iva = subtotal * 0.21;
    const total = subtotalConDescuento + iva;

    return (
        <Offcanvas show={show} onHide={handleClose} placement='end' style={{ width: "500px" }}>
            <Offcanvas.Header>
                <Cart size={25} className='text-primary me-3' />
                <Offcanvas.Title className="fw-bold">Carrito de Compras</Offcanvas.Title>
            </Offcanvas.Header>
            <hr />
            <Offcanvas.Body className="d-flex flex-column offcanvas-body" id="carrito-container">

                <div className="lista-productos">
                    {/* Lista de Productos */}
                    {carrito.length === 0 ? (
                        <p> Tu Carrito esta Vacio </p>
                    ) : (
                        carrito.map((prod) => (
                            <div key={prod.id} className="border-bottom pb-2 item">
                                <Trash
                                    className='text-danger'
                                    size={20}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => eliminarProducto(prod.id)}
                                />
                                <div className="imagen">
                                    <img className="img-carrito" src={prod.imagen}
                                        alt="" />
                                </div>
                                <div className="nombre">
                                    {prod.nombre}
                                </div>
                                <div className="precio">
                                    $ {prod.precio}
                                </div>
                                <div className="cantidad">
                                    <div>
                                        <ArrowUp
                                            className="contador-flecha text-warning"
                                            onClick={() => incrementarCantidad(prod.id)}
                                        />
                                    </div>
                                    <span className="fw-bold fs-5">
                                        {prod.cantidad}
                                    </span>
                                    <div >
                                        <ArrowDown
                                            className="contador-flecha text-warning "
                                            variant="outline-secondary"
                                            onClick={() => disminuirCantidad(prod.id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="footer-carrito">
                    <div className="totales">
                        <p>Subtotal: <span id="subtotal-carrito">$ {subtotal.toFixed(2)}</span></p><hr />
                        <p id="descuento">Descuento: <span id="descuento-carrito">$ {descuento.toFixed(2)}</span></p>
                        <p id="iva">IVA (21%): <span id="iva-carrito">$ {iva.toFixed(2)}</span></p><hr />
                        <p id="total">Total: <span id="total-carrito">$ {total.toFixed(2)}</span></p>
                    </div>
                    <div className="botones">
                        <Button id="vaciar-carrito" onClick={vaciarCarrito} disabled={carrito.length === 0}>Vaciar Carrito</Button>
                        <Button disabled={carrito.length === 0}>Pagar</Button>
                    </div>
                </div>
            </Offcanvas.Body >
        </Offcanvas >
    );
}

export default Carrito;