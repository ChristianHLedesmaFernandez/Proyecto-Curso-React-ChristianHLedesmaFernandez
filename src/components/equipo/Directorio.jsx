import React, { useState, useEffect } from "react";

import { Container, Row, Col, Spinner, Carousel } from 'react-bootstrap';

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config.js";

import TarjetaContacto from './TarjetaContacto';

function Directorio() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.onLine) {
      setError("Sin conexión a Internet");
      setCargando(false);
      return;
    }
    const equipoDB = collection(db, "equipo");
    getDocs(equipoDB)
      .then((resp) => {
        setUsuarios(
          resp.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }))
        );
        setCargando(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Error al cargar equipo");
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-3">Cargando equipo...</p>
      </Container>
    );
  }
  if (error) {
    return (
      <Container className="text-center py-5">
        <h3>{error}</h3>
      </Container>
    );
  }

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