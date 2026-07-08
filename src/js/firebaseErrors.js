export const obtenerMensajeFirebase = (codigo) => {

    switch (codigo) {

        case "auth/email-already-in-use":
            return "Ya existe una cuenta con ese correo electrónico.";

        case "auth/weak-password":
            return "La contraseña debe tener al menos 6 caracteres.";

        case "auth/invalid-email":
            return "El correo electrónico no es válido.";
            
        case "auth/invalid-credential":
            return "El correo electrónico o la contraseña son incorrectos.";

        case "auth/network-request-failed":
            return "No se pudo conectar con el servidor. Verifique su conexión a Internet.";

        default:
            return "Ocurrió un error inesperado.";
    }

};