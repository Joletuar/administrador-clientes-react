import { useLoaderData } from 'react-router-dom';
import Cliente from '../components/Cliente';
import { getClientes } from '../data/Clientes';

export function loader() {
    // Actúa muy similar a un useEffect // Se puede retornar lo que se desee, y siempre debe retornar algo

    return getClientes();
}

function Index() {
    const clientes = useLoaderData(); // Con esto podemos obtener los datos que retorna el loader

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
            <p className='mt-3'> Administrar Clientes</p>

            {clientes.length ? (
                <table className='w-full bg-white shadow table-auto mt-3'>
                    {/* Parte superior de la tabla */}
                    <thead className='bg-blue-800 text-white'>
                        {/* Table rows/Encabezados */}
                        <tr>
                            {/* Nombre de los encabezados */}
                            <th className='p-2'>Cliente</th>
                            <th className='p-2'>Contacto</th>
                            <th className='p-2'>Acciones</th>
                        </tr>
                    </thead>
                    {/* Cuerpo de la tabla */}
                    <tbody>
                        {clientes.map((cliente) => (
                            <Cliente key={cliente.id} cliente={cliente} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className='text-center mt-10'>No hay clientes aún</p>
            )}
        </>
    );
}

export default Index;
