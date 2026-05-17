import React, { useState, useEffect } from "react";

import { Container, Row, Col, Spinner, Carousel } from 'react-bootstrap';

import TarjetaContactoFooter from './TarjetaContactoFooter';

function DirectorioFooter() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('data/nosotros.json')
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


  if (cargando) return <Spinner animation="border" variant="warning" />;

  if (error) return <p>Error: {error}</p>;

// Creamos los grupos antes del return
  const grupos = agruparUsuarios(usuarios, 3);


  return (
    <Container className="mt-0">
      {/* Comienzo Titulo*/}
      <div className="text-center mb-4">
        <h2 className="fw-bold display-">Sobre <span className="text-primary">Nosotros</span></h2>
        <div
          className="mx-auto bg-primary"
          style={{ width: '60px', height: '4px', borderRadius: '2px' }}
        ></div>
        <p className="text-white mt-1 text-white">
          Conoce a las personas que hacen esto posible.
        </p>
      </div>
      {/* Fin Titulo*/}
      {/*    Sin Carrusel
      <Row>
        {usuarios.slice(0, 3).map(user => (
          // Col es el que define cuánto espacio ocupa cada tarjeta
          <Col key={user.id} xs={12} md={6} lg={4}>
            <TarjetaContacto {...user} />
          </Col>

        ))}
      </Row>
      */}
      {/* Con Carrusel */}
      <Carousel indicators={true} controls={false} interval={5000} pause="hover">
        {grupos.map((grupo, index) => (
          <Carousel.Item key={index}>
            <Row className="justify-content-center pb-5 px-5">
              {/* Ahora mapeamos el GRUPO, no el usuario individual directamente */}
              {grupo.map(user => (
                <Col key={user.id} xs={12} md={4}>
                  <TarjetaContactoFooter {...user} />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
      {/* Fin Carrusel */}
    </Container>
  );
}

export default DirectorioFooter;