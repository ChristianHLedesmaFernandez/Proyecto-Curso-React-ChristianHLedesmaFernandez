import { FloatingLabel, Form, Row, Col } from "react-bootstrap";


function FormularioProducto({ datosForm, manejarCambios, manejarCambioImagen, errores, preview }) {

    return (
        <>
            {/* nombre */}
            <FloatingLabel
                controlId="floatingInput"
                label="Nombre del Producto"
                className="mb-3"
            >
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
            </FloatingLabel>
            {/* categoria */}
            <FloatingLabel
                controlId="floatingInput"
                label="Categoria del Producto"
                className="mb-3"
            >
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
            </FloatingLabel>
            {/* Descripcion */}
            <FloatingLabel
                controlId="floatingInput"
                label="Descripcion del Producto"
                className="mb-3"
            >
                <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    rows={8}
                    name="descripcion"
                    value={datosForm.descripcion}
                    onChange={manejarCambios}
                    style={{ height: '100px' }}
                    isInvalid={!!errores.descripcion} />
                <Form.Control.Feedback type="invalid">
                    {errores.descripcion}
                </Form.Control.Feedback>
            </FloatingLabel>
            <Row className="mb-3">
                <Col md={4}>
                    {/* stock */}
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Stock"
                        className="mb-3"
                    >
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
                    </FloatingLabel>

                </Col>
                <Col md={4}>
                    {/* descuento */}
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Descuento (%)"
                        className="mb-3"
                    >
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
                    </FloatingLabel>
                </Col>
                <Col md={4}>
                    {/* precio */}
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Precio"
                        className="mb-3"
                    >
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
                    </FloatingLabel>
                </Col>
            </Row>
            {/* imagen */}
            <div className="d-flex align-items-center mb-3 mt-4">
                <hr className="flex-grow-1" />
                <span className="px-3 text-muted small">
                    Imagen
                </span>
                <hr className="flex-grow-1" />
            </div>
            <Form.Group className="mb-3">
                <Form.Control
                    type="file"
                    name="imagen"
                    onChange={manejarCambioImagen}
                    placeholder="Ingrese URL imagen"
                />
                {/* Vista Previa  */}
                {preview && (
                    <div className="text-center mt-3">
                        <img
                            src={preview}
                            alt="Vista previa"
                            className="img-thumbnail shadow"
                            style={{
                                maxHeight: "220px",
                                objectFit: "contain"
                            }}
                        />
                    </div>
                )}
            </Form.Group>
        </>
    );
}

export default FormularioProducto;