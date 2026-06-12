import React, { useState, useEffect } from "react";

import { Container, Row, Col, Spinner, Carousel } from 'react-bootstrap';

import TarjetaContacto from './TarjetaContacto';

function Directorio() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/nosotros.json')
      //fetch('https://proyecto-nodejs-tau.vercel.app/api/productos')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar');
        return res.json();
      })
      .then(data => {
        setUsuarios(data);
        setCargando(false);
      })
      .catch(err => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  // --- FUNCIÓN PARA AGRUPAR ---
  // Esta función toma el array de usuarios y lo divide en grupos de a 3
  const agruparUsuarios = (datos, tamano) => {
    const grupos = [];
    for (let i = 0; i < datos.length; i += tamano) {
      grupos.push(datos.slice(i, i + tamano));
    }
    return grupos;
  };


  if (cargando) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="warning" />
      </Container>
    );
  }

  if (error) return <p>Error: {error}</p>;

  // Creamos los grupos antes del return
  const grupos = agruparUsuarios(usuarios, 3);


  return (
    <section id="directorio" className="py-5">
      <Container className="mt-0">
        {/* Comienzo Titulo*/}
        <div className="text-center mb-4">
          <h2 className="fw-bold display-4">Sobre <span className="text-primary">Nosotros</span></h2>
          <div
            className="mx-auto bg-primary"
            style={{ width: '60px', height: '4px', borderRadius: '2px' }}
          ></div>
          <p className="text-black mt-1">
            Conoce a las personas que hacen esto posible.
          </p>
        </div>
        {/* Fin Titulo*/}
        <Row>
          {usuarios.map(user => (
            // Col es el que define cuánto espacio ocupa cada tarjeta
            <Col key={user.id} xs={12} md={6} lg={4}>
              <TarjetaContacto {...user} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Directorio;