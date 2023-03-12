import { getCliente } from '../data/Clientes';
import Formulario from '../components/Formulario';
import Error from '../components/Error';
import {
    Form,
    useActionData,
    useLoaderData,
    useNavigate,
    redirect,
} from 'react-router-dom';
import { actualizarCliente } from '../data/Clientes';

export async function loader({ params }) {
    // La variable params contiene los valores dinámicos que estamos pasando en la url
    const cliente = await getCliente(params.clienteId);

    if (Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: ' No hay Resultados',
        });
    }

    return cliente;
}

export async function action({ request, params }) {
    const formData = await request.formData(); // Almacena los datos que el usuario ha ingresado

    // Formatear la información

    const datos = Object.fromEntries(formData); // Información ya formateada en json
    const email = formData.get('email');

    // Validación de datos

    const errores = [];

    if (Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligtarios');
    }

    // Expresión regular para validar emails

    let regex = new RegExp(
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );

    if (!regex.test(email)) {
        errores.push('El email no es válido');
    }

    // Retornar datos y errores

    if (Object.keys(errores).length > 0) {
        return errores;
    }
    await actualizarCliente(params.clienteId, datos);

    return redirect('/'); // Redireccionamos a otra página
}

function EditarClientes() {
    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errores = useActionData();

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>
                Editar Cliente:{' '}
                <span className='text-black'>{cliente.nombre}</span>
            </h1>
            <p className='mt-3'>Edita los campos que desees</p>

            <div className='flex justify-end'>
                {/*tambien funcionaría poniendo -1 ya que eso nos llevaría a la página anterior */}
                <button
                    className='bg-blue-800 text-white px-3 py-1 font-bold uppercase mt-20'
                    onClick={() => navigate('/')}
                >
                    Volver
                </button>
            </div>

            <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10'>
                {errores?.length &&
                    errores.map((error, i) => <Error key={i}>{error}</Error>)}

                <Form method='post' action='#' noValidate>
                    <Formulario cliente={cliente} />

                    <input
                        className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg rounded-md'
                        type='submit'
                        value='Guardar Cambios'
                    />
                </Form>
            </div>
        </>
    );
}

export default EditarClientes;
