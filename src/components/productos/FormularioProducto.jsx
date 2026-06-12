
import { Form } from "react-bootstrap";

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
                    isValid={datosForm.nombre && !errores.nombre}
                />

                <Form.Control.Feedback type="invalid">
                    {errores.nombre}
                </Form.Control.Feedback>

            </Form.Group>

            {/* nombre */}
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
                    isValid={datosForm.categoria && !errores.categoria}
                />

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
                    isInvalid={!!errores.descripcion}
                />

                <Form.Control.Feedback type="invalid">
                    {errores.descripcion}
                </Form.Control.Feedback>
            </Form.Group>

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

            {/* imagen */}

            <Form.Group className="mb-3">

                <Form.Label>
                    Imagen URL
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