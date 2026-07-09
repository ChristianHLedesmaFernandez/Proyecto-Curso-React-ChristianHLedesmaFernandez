import { InputGroup, Form, Row, Col } from "react-bootstrap";
import { Archive, ArchiveFill, Box, Boxes, BoxFill, Check, CurrencyDollar, Grid3x2GapFill, Justify, Percent } from "react-bootstrap-icons";

function FormularioProducto({ datosForm, manejarCambios, manejarCambioImagen, errores, preview, modoEdicion }) {

    return (
        <>
            {/* nombre */}
            <InputGroup className="mb-3">
                <InputGroup.Text>
                    <BoxFill />
                </InputGroup.Text>
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
            </InputGroup>
            {/* categoria */}
            <InputGroup className="mb-3">
                <InputGroup.Text>
                    <Grid3x2GapFill />
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    name="categoria"
                    value={datosForm.categoria}
                    onChange={manejarCambios}
                    disabled={modoEdicion}
                    placeholder="Ingrese categoria del producto"
                    isInvalid={!!errores.categoria}
                    isValid={datosForm.categoria && !errores.categoria} />
                <Form.Control.Feedback type="invalid">
                    {errores.categoria}
                </Form.Control.Feedback>
            </InputGroup>
            {/* Descripcion */}
            <InputGroup className="mb-3">
                <InputGroup.Text>
                    <Justify />
                </InputGroup.Text>
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
            </InputGroup>
            <Row className="mb-3">
                <Col md={4}>
                    {/* stock */}
                    <InputGroup>
                        <InputGroup.Text>
                            <ArchiveFill />
                        </InputGroup.Text>
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
                    </InputGroup>

                </Col>
                <Col md={4}>
                    {/* descuento */}
                    <InputGroup>
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
                </Col>
                <Col md={4}>
                    {/* precio */}
                    <InputGroup>
                        <InputGroup.Text>
                            <CurrencyDollar />
                        </InputGroup.Text>
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
                    </InputGroup>
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