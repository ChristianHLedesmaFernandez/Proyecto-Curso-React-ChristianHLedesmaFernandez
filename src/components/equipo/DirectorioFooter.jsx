import React, { useState, useEffect } from "react";

import { Container, Row, Col, Spinner, Carousel } from 'react-bootstrap';

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config.js";

import TarjetaContactoFooter from './TarjetaContactoFooter';

function DirectorioFooter() {
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
        <p className="text-white mt-1">
          Conoce a las personas que hacen esto posible.
        </p>
      </div>
      {/* Fin Titulo*/}
      {/* Carrusel */}
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