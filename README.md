# 🛒 TechStore - Plataforma de Productos Tecnológicos

¡Bienvenido a **TechStore**!

TechStore es una aplicación web de comercio electrónico desarrollada como proyecto integrador del curso de **React JS**. Permite visualizar un catálogo de productos tecnológicos, gestionar un carrito de compras, autenticar usuarios mediante **Firebase Authentication** y administrar información almacenada en **Firebase Firestore**.

El proyecto fue desarrollado utilizando **React 19** y **Vite**, aplicando buenas prácticas como componentes reutilizables, Context API, rutas protegidas, carga incremental de datos, diseño responsivo y optimización SEO mediante **React Helmet**.

---

# 🚀 Características Principales

### 🔐 Autenticación de Usuarios

- Registro de nuevos usuarios mediante Firebase Authentication.
- Inicio y cierre de sesión.
- Persistencia automática de la sesión.
- Protección de rutas privadas mediante `ProtectedRoute`.

### 📦 Catálogo de Productos

- Carga dinámica de productos desde Firebase Firestore.
- Consulta individual de productos mediante rutas dinámicas.
- Navegación fluida entre catálogo y detalle del producto.

### 🛒 Carrito de Compras

- Gestión del carrito utilizando Context API.
- Agregado de productos.
- Control de cantidades.
- Visualización del resumen de compra.

### ⚙️ Panel de Administración

- Dashboard administrativo.
- Gestión de productos.
- Gestión de cupones.
- Acceso restringido únicamente a usuarios autenticados.

### 🔎 Buscador Global

- Barra de búsqueda disponible desde cualquier sección.
- Filtrado por nombre o descripción.
- Redirección automática al catálogo al realizar una búsqueda.
- Estado global implementado mediante Context API.

### 📄 Paginación Inteligente

- Carga incremental desde Firestore.
- Consultas optimizadas utilizando:
  - `query()`
  - `limit()`
  - `startAfter()`
- Contador del total de productos mediante `getCountFromServer()`.
- Selección dinámica de productos por página:
  - 5 productos
  - 10 productos
  - 15 productos
  - 20 productos

### 🎨 Experiencia de Usuario (UX)

- Indicadores de carga mediante Spinner.
- Manejo de errores amigable.
- Confirmaciones mediante SweetAlert2.
- Navegación intuitiva.
- Diseño completamente responsivo.

### 🌐 Optimización SEO

- Implementación de `react-helmet-async`.
- Títulos dinámicos por página.
- Meta descripciones específicas para cada sección.

### 🧩 Arquitectura Modular

- Componentes reutilizables.
- Layout compartido.
- Context API para el manejo del estado global.
- Separación de responsabilidades.
- Código organizado y escalable.

---

# 🛠️ Tecnologías Utilizadas

El proyecto utiliza un stack tecnológico moderno basado en React y Firebase.

## Frontend

- **React 19**
- **React DOM**
- **React Router DOM 7**
- **Vite 8**

## Backend & Base de Datos

- **Firebase Authentication**
- **Firebase Firestore**

## Interfaz de Usuario

- Bootstrap 5
- React-Bootstrap
- Bootstrap Icons
- React Bootstrap Icons

## Gestión del Estado

- Context API
- Hooks de React

## Alertas

- SweetAlert2

## SEO

- React Helmet Async

---

# 📚 Conceptos de React Aplicados

Durante el desarrollo del proyecto se implementaron los siguientes conceptos:

- Componentes reutilizables
- Props
- Hooks
  - useState
  - useEffect
  - useContext
- Context API
- React Router DOM
- Rutas protegidas
- Renderizado condicional
- Formularios controlados
- Manejo de eventos
- Consumo de APIs de Firebase
- Firebase Authentication
- Firebase Firestore
- Consultas optimizadas
- React Helmet
- React Bootstrap
- Responsive Design
- Manejo de estados de carga y errores

---

# 📂 Estructura del Proyecto

```
src/
│
├── components/
│   ├── contactos/
│   ├── equipo/
│   ├── gestion/
│   ├── layout/
│   ├── login/
│   ├── productos/
│   └── routes/
│
├── context/
│   ├── AuthContext.jsx
│   ├── CarritoContext.jsx
│   └── SearchContext.jsx
│
├── firebase/
│   └── config.js
│
├── js/
│   ├── firebaseErrors.js
│   └── funciones.js
│
├── App.jsx
└── main.jsx
```

---

# 💻 Instalación y Ejecución Local

## 1️⃣ Prerrequisitos

Tener instalado:

- Node.js 18 o superior
- npm

---

## 2️⃣ Clonar el repositorio

```bash
git clone https://github.com/ChristianHLedesmaFernandez/Proyecto-Curso-React-ChristianHLedesmaFernandez.git
```

---

## 3️⃣ Ingresar al proyecto

```bash
cd Proyecto-Curso-React-ChristianHLedesmaFernandez
```

---

## 4️⃣ Instalar dependencias

```bash
npm install
```

---

## 5️⃣ Configurar Firebase

Crear un archivo `.env` con las credenciales correspondientes de Firebase.

Ejemplo:

```env
VITE_API_KEY=xxxxxxxx
VITE_AUTH_DOMAIN=xxxxxxxx
VITE_PROJECT_ID=xxxxxxxx
VITE_STORAGE_BUCKET=xxxxxxxx
VITE_MESSAGING_SENDER_ID=xxxxxxxx
VITE_APP_ID=xxxxxxxx
```

---

## 6️⃣ Ejecutar el proyecto

```bash
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:5173
```

---

# 📸 Funcionalidades Destacadas

- ✅ Registro de usuarios
- ✅ Inicio de sesión
- ✅ Protección de rutas
- ✅ Catálogo dinámico
- ✅ Detalle de productos
- ✅ Carrito de compras
- ✅ Buscador global
- ✅ Paginación inteligente
- ✅ Dashboard administrativo
- ✅ Gestión de productos
- ✅ Gestión de cupones
- ✅ Diseño responsivo
- ✅ SEO con React Helmet
- ✅ Firebase Authentication
- ✅ Firebase Firestore

---

# 🎯 Objetivos del Proyecto

Este proyecto fue desarrollado con el objetivo de aplicar los conocimientos adquiridos durante el curso de React, integrando tecnologías modernas para construir una aplicación web completa que implementa:

- Arquitectura basada en componentes.
- Gestión global del estado.
- Persistencia de datos.
- Autenticación de usuarios.
- Navegación SPA.
- Buenas prácticas de desarrollo.
- Interfaces responsivas.
- Optimización de consultas a Firestore.

---

# 👨‍💻 Autor

**Christian Horacio Ledesma Fernandez**

Proyecto desarrollado como práctica integradora del curso de **React JS**, utilizando React, Firebase y React-Bootstrap.

---

# 📄 Licencia

Este proyecto fue desarrollado con fines educativos y de aprendizaje.