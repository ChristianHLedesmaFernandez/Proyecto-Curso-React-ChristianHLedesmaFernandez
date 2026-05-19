import { useState } from 'react';
import Swal from 'sweetalert2'
import { Button } from 'react-bootstrap';
import { ArrowDownSquare, ArrowUpSquare } from 'react-bootstrap-icons';

export function Contador({ stock }) {

    //const [NombreVariable, NombrefunciónCambiaEstado] = useState(valor Inicial)
    const [contador, setContador] = useState(0);

    const incrementar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (contador >= stock) {
            Swal.fire({
                title: `No Puede ser mayor a ${stock}`,
                theme: 'Auto'
            })
        } else {
            setContador(contador + 1); //¡Usamos la función para actualizar el estado!    
        }
    };

    const decrementar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (contador == 0) {
            Swal.fire({
                title: `No Puede ser cero!`,
                theme: 'Auto'
            })
        } else {
            setContador(contador - 1);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
            <div onClick={incrementar}>
                <ArrowUpSquare
                    className="contador-flecha text-warning "
                />
            </div>
            <span className="fw-bold fs-5">
                {contador}
            </span>
            <div onClick={decrementar}>
                <ArrowDownSquare
                    className="contador-flecha text-warning "
                />
            </div>
        </div>
    );

}