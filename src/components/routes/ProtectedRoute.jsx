import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Container, Spinner } from "react-bootstrap";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();


  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-3">Cargando...</p>
      </Container>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute