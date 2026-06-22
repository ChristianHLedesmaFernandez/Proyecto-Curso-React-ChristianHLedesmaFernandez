import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/layout/Layout';
import Inicio from "./components/pages/Inicio";
import Contactos from "./components/contactos/Contacto";
import ProductosContainer from "./components/productos/ProductosContainer";
import ProductoDetalle from "./components/productos/ProductoDetalle";
import Directorio from "./components/equipo/Directorio";

import Dashboard from "./components/gestion/Dashboard";
import AdminProductos from "./components/gestion/AdminProductos";
import AdminCupones from "./components/gestion/cupones/AdminCupones";

function App() {
  return (


    <Routes>

      <Route element={<Layout />}>

        <Route path="/" element={<Inicio />} />

        <Route
          path="/productos" element={<ProductosContainer />}/>

        <Route
          path="/equipo" element={<Directorio />}/>

        <Route
          path="/contacto" element={<Contactos />}/>

        <Route 
          path="/gestion/productos" element={<AdminProductos />} />
          
        <Route 
          path="/gestion/cupones" element={<AdminCupones />} />
          
        <Route 
          path="/gestion/dashboard" element={<Dashboard />} /> 

        <Route 
          path="/producto/:id" element={<ProductoDetalle />} />
      </Route>

    </Routes>


  );
}

export default App;
