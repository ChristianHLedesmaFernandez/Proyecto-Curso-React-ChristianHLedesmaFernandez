import { Container, Button } from "react-bootstrap";
import { importarProductos } from "../../js/importarProductos.js"

function Dashboard() {
    return (
        <header className="bg-primary text-white py-1 shadow-sm">
            <Container>
                <div className="box-body">
                    <h1 className="">Dasboard</h1>
                    <p className="lead">Aca iria el DASHBOARD</p>
                    {/*
                    <Button
                        variant="success"
                        onClick={importarProductos}
                    >
                        Importar Productos
                    </Button>
                    */}
                </div>
            </Container>
        </header>
    );
};
export default Dashboard;
