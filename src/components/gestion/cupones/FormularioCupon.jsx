import { Form, Row, Col } from "react-bootstrap";

function FormularioCupon({ datosForm, manejarCambios, errores }) {

    return (
        <>


            {/* nombre */}
            <Form.Group className="mb-3">
                <Form.Label>
                    Codigo Cupon
                </Form.Label>
                <Form.Control
                    type="text"
                    name="codigo"
                    value={datosForm.codigo}
                    onChange={manejarCambios}
                    placeholder="Ingrese Codigo del Cupon"
                    isInvalid={!!errores.codigo}
                    isValid={datosForm.codigo && !errores.codigo} />
                <Form.Control.Feedback type="invalid">
                    {errores.codigo}
                </Form.Control.Feedback>
            </Form.Group>


            {/* descuento */}
            <Form.Group className="mb-3">
                <Form.Label>Descuento (%)</Form.Label>
                <Form.Control
                    type="number"
                    name="descuento"
                    value={datosForm.descuento}
                    onChange={manejarCambios}
                    placeholder="Ingrese descuento"
                    min="0"
                    max="100"
                    isInvalid={!!errores.descuento}
                    isValid={datosForm.descuento && !errores.descuento}
                />

                <Form.Control.Feedback type="invalid">
                    {errores.descuento}
                </Form.Control.Feedback>
            </Form.Group>

        </>


    );

}

export default FormularioCupon;