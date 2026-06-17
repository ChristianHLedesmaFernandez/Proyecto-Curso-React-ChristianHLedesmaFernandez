import { Form, Row, Col } from "react-bootstrap";

function FormularioProducto({ datosForm, manejarCambios, manejarCambioImagen, errores }) {

    return (
        <>


            {/* nombre */}
            <Form.Group className="mb-3">
                <Form.Label>
                    Nombre Producto
                </Form.Label>
                <Form.Control
                    type="text"
                    name="nombre"
                    value={datosForm.nombre}
                    onChange={manejarCambios}
                    placeholder="Ingrese nombre producto"
                    isInvalid={!!errores.nombre}
                    isValid={datosForm.nombre && !errores.nombre} />
                <Form.Control.Feedback type="invalid">
                    {errores.nombre}
                </Form.Control.Feedback>
            </Form.Group>

            {/* categoria */}
            <Form.Group className="mb-3">
                <Form.Label>
                    Categoria del Producto
                </Form.Label>
                <Form.Control
                    type="text"
                    name="categoria"
                    value={datosForm.categoria}
                    onChange={manejarCambios}
                    placeholder="Ingrese categoria del producto"
                    isInvalid={!!errores.categoria}
                    isValid={datosForm.categoria && !errores.categoria} />
                <Form.Control.Feedback type="invalid">
                    {errores.categoria}
                </Form.Control.Feedback>
            </Form.Group>

            {/* Descripcion */}
            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    name="descripcion"
                    value={datosForm.descripcion}
                    onChange={manejarCambios}
                    style={{ resize: "none" }}
                    isInvalid={!!errores.descripcion} />
                <Form.Control.Feedback type="invalid">
                    {errores.descripcion}
                </Form.Control.Feedback>
            </Form.Group>
            <Row>
                <Col md={4}>
                    {/* stock */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Stock
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="stock"
                            value={datosForm.stock}
                            onChange={manejarCambios}
                            placeholder="Ingrese stock"
                            isInvalid={!!errores.stock}
                            isValid={datosForm.stock && !errores.stock}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errores.stock}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={4}>
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
                        />
                        <Form.Control.Feedback type="invalid">
                            {errores.descuento}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    {/* precio */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Precio
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="precio"
                            value={datosForm.precio}
                            onChange={manejarCambios}
                            placeholder="Ingrese precio"
                            isInvalid={!!errores.precio}
                            isValid={datosForm.precio && !errores.precio}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errores.precio}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            {/* imagen */}

            <Form.Group className="mb-3">

                <Form.Label>
                    Seleccionar Imagen
                </Form.Label>

                <Form.Control
                    type="file"
                    name="imagen"
                    onChange={manejarCambioImagen}
                    placeholder="Ingrese URL imagen"
                />

            </Form.Group>
        </>


    );

}

export default FormularioProducto;