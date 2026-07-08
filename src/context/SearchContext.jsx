import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export function useSearch() {
    const context = useContext(SearchContext);

    if (!context) {
        throw new Error("useSearch debe usarse dentro de SearchProvider");
    }

    return context;
}

export function SearchProvider({ children }) {

    const [busqueda, setBusqueda] = useState("");

    return (
        <SearchContext.Provider
            value={{
                busqueda,
                setBusqueda
            }}>
            {children}
        </SearchContext.Provider>);
}
