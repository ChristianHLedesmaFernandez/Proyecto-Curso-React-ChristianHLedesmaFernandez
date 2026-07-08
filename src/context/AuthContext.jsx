import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { auth } from "../firebase/config";

const AuthContext = createContext();

// Hook personalizado 
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};


export function AuthProvider({ children }) {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Se encarga del inicio de sesion
    const login = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };
    // Se encarga de cerrar Sesion
    const logout = async () => {
        return await signOut(auth);
    };
    // Función para registrar un nuevo usuario 
    const register = async (email, password) => { 
        return createUserWithEmailAndPassword(auth, email, password); 
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (usuario) => {

            setUser(usuario);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );

};



