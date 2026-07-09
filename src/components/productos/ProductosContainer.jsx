import React, { useState, useEffect } from "react";
import { Container, Spinner, Button, Form } from 'react-bootstrap';
import { collection, getDocs, query, limit, startAfter, getCountFromServer } from 'firebase/firestore';
import { db } from '../../firebase/config.js';
import ItemList from "./ItemList";
import ModalProductos from "./ModalProductos";
import { Helmet } from "react-helmet-async";
import { useSearch } from "../../context/SearchContext.jsx"

function ProductosContainer() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    // Para la Busqueda
    const { busqueda } = useSearch();
    // Para la Paginacion
    const [productosPorPagina, setProductosPorPagina] = useState(5);
    const [cargandoMas, setCargandoMas] = useState(false);
    const [ultimoVisible, setUltimoVisible] = useState(null);
    const [hayMas, setHayMas] = useState(true);

    const [totalProductos, setTotalProductos] = useState(0);


    /*    Cargando desde un Archivo.
        useEffect(() => {
            fetch('data/productos.json')
                //fetch('https://proyecto-nodejs-tau.vercel.app/api/productos') // Dessde mi API (del curso de Node JS)
                .then(res => {
                    if (!res.ok) throw new Error('Error al cargar');
                    return res.json();
                })
                .then(data => {
                    setProductos(data);
                    setCargando(false);
                })
                .catch(err => {
                    setError(err.message);
                    setCargando(false);
                });
        }, []);
    */

    /* Cargando desde Firestore
    useEffect(() => {
        if (!navigator.onLine) {
            setError("Sin conexión a Internet");
            setCargando(false);
            return;
        }

        const productosDB = collection(db, "productos nacionales")
        getDocs(productosDB)
            .then((resp) => {
                setProductos(
                    resp.docs.map((doc) => {
                        return { ...doc.data(), id: doc.id }
                    })
                )
                setCargando(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Error al cargar productos");
                setCargando(false);
            });
    }, []);
 */
    const obtenerProductosIniciales = async () => {
        if (!navigator.onLine) {
            setError("Sin conexión a Internet");
            setCargando(false);
            return;
        }
        setCargando(true);
        setUltimoVisible(null); //reinicia completamente la paginación cuando cambia la cantidad de productos.

        try {

            const productosDB = collection(db, "productos nacionales");

            // 👇 NUEVO: Obtenemos el conteo total real desde el servidor
            const conteoSnapshot = await getCountFromServer(productosDB);
            setTotalProductos(conteoSnapshot.data().count);


            const q = query(productosDB, limit(productosPorPagina));
            const resp = await getDocs(q);
            const productosData = resp.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setProductos(productosData);

            const ultimoDoc = resp.docs[resp.docs.length - 1];
            setUltimoVisible(ultimoDoc);

            setHayMas(resp.docs.length === productosPorPagina);

        } catch (error) {
            console.error(error);
            setError("Error al cargar productos");

        } finally {
            setCargando(false);
        }
    };

    const obtenerMasProductos = async () => {

        if (!navigator.onLine) {
            setError("Sin conexión a Internet");
            setCargando(false);
            return;
        }

        if (!hayMas || cargandoMas) return;
        setCargandoMas(true);

        try {
            const productosDB = collection(db, "productos nacionales");
            const q = query(productosDB, startAfter(ultimoVisible), limit(productosPorPagina));
            const resp = await getDocs(q);
            const productosData = resp.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setProductos(productosAnteriores => [...productosAnteriores, ...productosData]);
            const ultimoDoc = resp.docs[resp.docs.length - 1];
            setUltimoVisible(ultimoDoc);

            setHayMas(resp.docs.length === productosPorPagina);

        } catch (error) {
            console.error(error);
            setError("Error al cargar más productos");

        } finally {
            setCargandoMas(false);
        }
    };

    const verMenos = () => {
        obtenerProductosIniciales();
        window.scrollTo({ top: 0, behavior: "smooth" });  // Desplazar la vista hacia arriba
    }

    useEffect(() => {
        obtenerProductosIniciales();
    }, [productosPorPagina]);



    if (cargando) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="warning" />
                <p className="mt-3">Cargando productos...</p>
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
    // Filtrado de la Busqueda 
    const productosFiltrados = productos.filter((prod) =>
        prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        prod.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <>
            <Helmet>
                <title>Productos | TechStore</title>
                <meta
                    name="description"
                    content="Explora nuestro catálogo de productos tecnológicos."
                />
            </Helmet>
            <section id="productos" className="py-5">
                <Container className="mt-0">
                    {/* Comienzo Titulo*/}
                    <div className="text-center mb-4">
                        <h2 className="fw-bold display-4">Nuestros <span className="text-primary">Productos</span></h2>
                        <div
                            className="mx-auto bg-primary"
                            style={{ width: '60px', height: '4px', borderRadius: '2px' }}
                        ></div>
                        <p className="text-black mt-1">
                            Conoce nuestros productos.
                        </p>
                    </div>
                    {/* Fin Titulo*/}
                    {/* Barra del Paginado */}
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center border-top border-bottom py-3 mb-4 gap-2">
                        <div className="text-muted fw-semibold">
                            {busqueda.trim() ? (
                                // Si el usuario está usando la barra de búsqueda local
                                `${productosFiltrados.length} ${productosFiltrados.length === 1
                                    ? "producto encontrado"
                                    : "productos encontrados"
                                }`
                            ) : (
                                // Si está navegando normalmente con la paginación
                                `Mostrando ${productos.length} de ${totalProductos} productos`
                            )}
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <span className="fw-semibold small">Mostrar:</span>
                            <Form.Select
                                value={productosPorPagina}
                                onChange={(e) =>
                                    setProductosPorPagina(Number(e.target.value))
                                }
                                style={{ width: "160px" }}
                                className="form-select-sm"
                            >
                                <option value={5}>5 productos</option>
                                <option value={10}>10 productos</option>
                                <option value={15}>15 productos</option>
                                <option value={20}>20 productos</option>
                            </Form.Select>
                        </div>
                    </div>



                    {/* Productos */}
                    {productosFiltrados.length === 0 ? (
                        <div className="text-center py-5">
                            <h4>No se encontraron productos.</h4>
                        </div>
                    ) : (
                        <>
                            <ItemList productos={productosFiltrados} />
                            <div className="text-center mt-4">
                                {hayMas ? (
                                    <Button
                                        onClick={obtenerMasProductos}
                                        disabled={cargandoMas}
                                    >
                                        {cargandoMas ? (
                                            <>
                                                <Spinner
                                                    animation="border"
                                                    size="sm"
                                                    className="me-2"
                                                />
                                                Cargando...
                                            </>
                                        ) : (
                                            "Cargar más"
                                        )}
                                    </Button>
                                ) : (
                                    <>
                                        <p className="text-muted mb-3">
                                            No hay más productos para mostrar.
                                        </p>
                                        <Button
                                            variant="outline-primary"
                                            onClick={verMenos}
                                        >
                                            Ver menos
                                        </Button>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </Container>
            </section>
        </>
    );
}

export default ProductosContainer;