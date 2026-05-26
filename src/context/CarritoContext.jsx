import { useState, useContext, createContext } from "react";
import Swal from 'sweetalert2'

export const CarritoContext = createContext();

export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
    }
    return context;
};

export const CarritoProvider = ({ children }) => {

    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        const productoExistente = carrito.find((prod) => prod.id === producto.id);
        if (productoExistente) {
            const carritoActualizado = carrito.map((prod) =>
                prod.id === producto.id
                    ?
                    { ...prod, cantidad: prod.cantidad + producto.cantidad }
                    :
                    prod
            );
            setCarrito(carritoActualizado);
        } else {
            setCarrito([
                ...carrito,
                producto
            ]);
        }
    };

    const eliminarProducto = (id) => {
        const carritoFiltrado = carrito.filter(
            (prod) => prod.id !== id
        );
        setCarrito(carritoFiltrado);
    };

    const incrementarCantidad = (id) => {

        const producto = carrito.find(
            (prod) => prod.id === id
        );

        if (producto.cantidad >= producto.stock) {
            Swal.fire({
                title: `No Hay mas stock disponible`,
                theme: 'warning'
            })
            return;
        } 

        const carritoActualizado = carrito.map((prod) =>
            prod.id === id
                ? {
                    ...prod,
                    cantidad: prod.cantidad + 1
                }
                : prod
        );

        setCarrito(carritoActualizado);
    };

    const disminuirCantidad = (id) => {
        const carritoActualizado = carrito
            .map((prod) =>
                prod.id === id
                    ? {
                        ...prod,
                        cantidad: prod.cantidad - 1
                    }
                    : prod
            )
            .filter((prod) => prod.cantidad > 0);
        setCarrito(carritoActualizado);
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                eliminarProducto,
                incrementarCantidad,
                disminuirCantidad,
                vaciarCarrito
            }}
        >
            {children}
        </CarritoContext.Provider>
    );

}