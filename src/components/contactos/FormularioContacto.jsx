import { Form, Button } from 'react-bootstrap';

import InputGroup from 'react-bootstrap/InputGroup';

function FormularioContacto({ datosForm, manejarCambios, manejarEnvio, manejarBlur, errores, touched }) {

  return (
    <Form className="text-start" noValidate onSubmit={manejarEnvio}>
      {/* Nombre */}
      <Form.Group className="mb-3">
        <Form.Label>Nombre Completo</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={datosForm.nombre}
          onChange={manejarCambios}
          onBlur={manejarBlur}
          placeholder="Ej: Juan Perez"
          required
          isInvalid={touched.nombre && !!errores.nombre}
          isValid={datosForm.nombre && !errores.nombre}
        />
        <Form.Control.Feedback type="invalid">
          {errores.nombre}
        </Form.Control.Feedback>
      </Form.Group>
      {/* email */}
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          value={datosForm.email}
          onChange={manejarCambios}
          onBlur={manejarBlur}
          type="email"
          placeholder="nombre@correo.com"
          required
          isInvalid={touched.email && !!errores.email}
          isValid={datosForm.email && !errores.email}
        />

        <Form.Control.Feedback type="invalid">
          {errores.email}
        </Form.Control.Feedback>
      </Form.Group>
      {/* telefono */}
      <Form.Group className="mb-3">
        <Form.Label>Teléfono (Opcional)</Form.Label>

        <Form.Control
          name="telefono"
          value={datosForm.telefono}
          onChange={manejarCambios}
          onBlur={manejarBlur}
          type="tel"
          placeholder="+54..."
          isInvalid={!!errores.telefono}
          isInvalid={touched.telefono && !!errores.telefono}
          isValid={datosForm.telefono && !errores.telefono}
        />

        <Form.Control.Feedback type="invalid">
          {errores.telefono}
        </Form.Control.Feedback>

      </Form.Group>
      {/* mensaje */}
      <Form.Group className="mb-3">
        <Form.Label>Mensaje</Form.Label>

        <Form.Control
          name="mensaje"
          value={datosForm.mensaje}
          onChange={manejarCambios}
          onBlur={manejarBlur}
          as="textarea"
          rows={4}
          placeholder="Escriba aqui su Mensaje..."
          style={{ resize: 'none' }}
          required
          isInvalid={touched.mensaje && !!errores.mensaje}
          isValid={datosForm.mensaje && !errores.mensaje}
        />

        <Form.Control.Feedback type="invalid">
          {errores.mensaje}
        </Form.Control.Feedback>

      </Form.Group>
      <div className="d-grid shadow-sm">
        <Button
          type='submit'
          variant="primary"
          size="lg">
          Enviar Mensaje
        </Button>
      </div>
    </Form>
  );
};

export default FormularioContacto;