import ItemList from "./ItemList";
import { Container } from "react-bootstrap";

function ItemListContainer({ Mensaje }) {

    const productos = [
        { id: '1234', nombre: 'Notebook Pro', imagen: "/imagenes/notebookPro.webp", precio: 12000, stock: 5 },
        { id: '2344', nombre: 'Monitor Curvo',  imagen: "/imagenes/monitorCurvo.webp", precio: 450000, stock: 25 },
        { id: '2545', nombre: 'Teclado Mecánico', imagen: "/imagenes/teclado.webp", precio: 15000, stock: 50 },];
        
    return (
       <Container>
        
                <ItemList productos={productos} />
        </Container>  
        
    );
}

export default ItemListContainer;