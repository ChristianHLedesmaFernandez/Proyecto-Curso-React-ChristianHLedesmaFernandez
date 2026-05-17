// Funciones auxiliares
const expresiones = {  
  nombre: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/,          // Solo letras, ñ, acentos, espacios
  categoria: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/,       // Solo letras, ñ, acentos, espacios
  descripcion: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$/,   // Solo letras, ñ, acentos, espacios y números
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  telefono: /^[0-9+\-\s()]+$/

};
// =========================
// Nombre
// =========================
export const validarNombre = (valor) => {
  if (!valor.trim()) {
    return "El nombre es obligatorio.";
  }
  if (!expresiones.nombre.test(valor)) {
    return "Solo letras y espacios.";
  }
  return "";
};
// =========================
// EMAIL
// =========================
export const validarEmail = (valor) => {
  if (!valor.trim()) {
    return "El email es obligatorio.";
  }
  if (!expresiones.email.test(valor)) {
    return "Ingrese un email válido.";
  }
  return "";
};
// =========================
// TELEFONO
// =========================
export const validarTelefono = (valor) => {
  // opcional
  if (!valor.trim()) {
    return "";
  }
  if (!expresiones.telefono.test(valor)) {
    return "Ingrese un teléfono válido.";
  }
  return "";
};
// =========================
// MENSAJE
// =========================
export const validarMensaje = (valor) => {
  if (!valor.trim()) {
    return "El mensaje es obligatorio.";
  }
  return "";
};
// =========================
// DESCRIPCION
// =========================
export const validarDescripcion = (valor) => {
  if (!valor.trim()) {
    return "La descripción es obligatoria.";
  }
  if (!expresiones.descripcion.test(valor)) {
    return "La descripción contiene caracteres inválidos.";
  }
  return "";
};
// =========================
// STOCK
// =========================
export const validarStock = (valor) => {
  if (!valor.toString().trim()) {
    return "El stock es obligatorio.";
  }
  const numero = Number(valor);
  if (!Number.isInteger(numero) || numero < 1) {
    return "El stock debe ser un número natural.";
  }
  return "";
};
// =========================
// PRECIO
// =========================
export const validarPrecio = (valor = "") => {
    if (!valor.toString().trim()) {
        return "El precio es obligatorio.";
    }
    const numero = Number(valor);
    if (Number.isNaN(numero)) {
        return "Debe ser un número.";
    }
    if (numero < 1) {
        return "Debe ser positivo.";
    }
    if (Math.round(numero * 100) / 100 !== numero) {
        return "Máximo dos decimales.";
    }
    return "";
};
// =========================
// CATEGORIA
// =========================
export const validarCategoria = (valor) => {
  if (!valor.trim()) {
    return "La categoría es obligatoria.";
  }
  if (!expresiones.categoria.test(valor)) {
    return "Solo letras y espacios.";
  }
  return "";
};
