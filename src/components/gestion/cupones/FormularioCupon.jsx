import { InputGroup, Form, Row, Col } from "react-bootstrap";

import { Percent, UpcScan } from "react-bootstrap-icons";

function FormularioCupon({ datosForm, manejarCambios, errores }) {
    return (
        <>
            {/* codigo */}
            <InputGroup className="mb-3">
                <InputGroup.Text>
                    <UpcScan />
                </InputGroup.Text>
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
            </InputGroup>

            {/* descuento */}
            <InputGroup className="mb-3">
                <InputGroup.Text>
                    <Percent />
                </InputGroup.Text>
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
            </InputGroup>
        </>
    );
}

export default FormularioCupon;