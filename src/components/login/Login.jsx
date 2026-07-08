import { useState } from "react"
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";
import Swal from "sweetalert2";

import { useAuth } from "../../context/AuthContext"
import FormularioLogin from "./FormularioLogin";
import { obtenerMensajeFirebase } from "../../js/firebaseErrors";

const Login = () => {

    const navigate = useNavigate();

    const { login, user } = useAuth();

    const [datosForm, setDatosForm] = useState({
        email: "",
        password: ""
    });
    const manejarCambios = (e) => {
        const { name, value } = e.target;
        setDatosForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const iniciarSesion = async (e) => {
        e.preventDefault();
        try {
            const credenciales = await login(datosForm.email, datosForm.password);
            navigate("/");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: obtenerMensajeFirebase(error.code)
            });
            setDatosForm({
                email: "",
                password: ""
            });
        }
    };

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (

        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card style={{ width: "28rem" }}>
                <Card.Body>
                    <Card.Title className="text-center mb-4">
                        {/* Comienzo Titulo*/}
                        <div className="text-center mb-4">
                            <h2 className="fw-bold display-5">Inicio de <span className="text-primary">Sesión</span></h2>
                            <div
                                className="mx-auto bg-primary"
                                style={{ width: '60px', height: '4px', borderRadius: '2px' }}
                            ></div>
                        </div>
                        {/* Fin Titulo*/}
                    </Card.Title>

                    <Form className="text-start" onSubmit={iniciarSesion} noValidate>
                        <FormularioLogin
                            datosForm={datosForm}
                            manejarCambios={manejarCambios}
                        />

                        <Button
                            type="submit"
                            className="w-100 mt-3"
                            variant="primary"
                        >
                            Ingresar
                        </Button>
                        <div className="text-center mt-3">
                            <small>
                                ¿No tenés una cuenta?{" "}
                                <Link to="/registro">
                                    Registrate
                                </Link>
                            </small>
                        </div>
                    </Form>

                </Card.Body>
            </Card>
        </Container>

    )
};

export default Login