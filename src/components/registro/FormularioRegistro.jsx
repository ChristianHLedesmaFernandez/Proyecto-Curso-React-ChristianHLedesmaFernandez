import { Form, InputGroup } from "react-bootstrap";
import { Envelope, Lock } from "react-bootstrap-icons";

const FormularioRegistro = ({ datosForm, manejarCambios }) => {
    return (
        <>
            {/* Email */}
            <InputGroup className="mb-3">
                <InputGroup.Text>
                    <Envelope />
                </InputGroup.Text>

                <Form.Control
                    type="email"
                    name="email"
                    placeholder="Ingrese su correo electrónico"
                    value={datosForm.email}
                    onChange={manejarCambios}
                />
            </InputGroup>

            {/* Contraseña */}
            <InputGroup className="mb-3">
                <InputGroup.Text>
                    <Lock />
                </InputGroup.Text>

                <Form.Control
                    type="password"
                    name="password"
                    placeholder="Ingrese su contraseña"
                    value={datosForm.password}
                    onChange={manejarCambios}
                />
            </InputGroup>
        </>
    )
}

export default FormularioRegistro