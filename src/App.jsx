import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/layout/Layout';
import Inicio from "./components/pages/Inicio";
import Contactos from "./components/contactos/Contacto";
import ProductosContainer from "./components/productos/ProductosContainer";
import Directorio from "./components/equipo/Directorio";

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

      </Route>

    </Routes>


  );
}

export default App;
