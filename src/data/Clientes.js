export async function getClientes() {
    // Asi importamos nuestras variables de entorno
    const respuesta = await fetch(import.meta.env.VITE_API_URL); // Por default el método del fetch es GET
    const resultado = await respuesta.json();

    return resultado;
}

export async function getCliente(id) {
    // Asi importamos nuestras variables de entorno
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`); // Por default el método del fetch es GET
    const resultado = await respuesta.json();

    return resultado;
}

export async function addCliente(datos) {
    try {
        // Vamos a definir el método POST para el fetch
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            // Especificamos que estamos enviando un objeto de tipo json
            headers: {
                'Content-Type': 'application/json',
            },
        });

        await respuesta.json();
    } catch (error) {
        console.log(error);
    }
}

export async function actualizarCliente(id, datos) {
    try {
        // Vamos a definir el método POST para el fetch
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            // Especificamos que estamos enviando un objeto de tipo json
            headers: {
                'Content-Type': 'application/json',
            },
        });

        await respuesta.json();
    } catch (error) {
        console.log(error);
    }
}

export async function eliminarCliente(id) {
    try {
        // Vamos a definir el método POST para el fetch
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE',
        });

        await respuesta.json();
    } catch (error) {
        console.log(error);
    }
}
