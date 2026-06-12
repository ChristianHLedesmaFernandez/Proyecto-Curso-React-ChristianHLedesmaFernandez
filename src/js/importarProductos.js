import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import productos from "../data/productos.json";

import Swal from "sweetalert2";

export const importarProductos = async () => {

    const result = await Swal.fire({
        title: "¿Importar productos?",
        text: "Se cargarán los productos del JSON a Firestore",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Importar"
    });

    if (!result.isConfirmed) return;

    try {

        const productosDB = collection(
            db,
            "productos nacionales"
        );

        let contador = 0;

        for (const producto of productos) {

            const { id, ...productoSinId } = producto;

            await addDoc(
                productosDB,
                productoSinId
            );

            contador++;
        }

        Swal.fire({
            title: "Importación completada",
            text: `${contador} productos cargados`,
            icon: "success"
        });

    } catch (error) {

        console.error(error);

        Swal.fire({
            title: "Error",
            text: "No se pudieron importar los productos",
            icon: "error"
        });

    }
};