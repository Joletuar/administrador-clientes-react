import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'; // Permite que al presionar un boton o una acción se pueda navegar a otra página
import Formulario from '../components/Formulario';
import Error from '../components/Error';
import { addCliente } from '../data/Clientes';

// En estas últimas versiones react-router-dom ha incluido manejo de peticiones http como GET y POST

export async function action({ request }) {
    // Esta función se llama cada vez que se envía el formulario

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

    if (Object.keys(errores).length) {
        return errores;
    }

    await addCliente(datos);

    return redirect('/'); // Redireccionamos a otra página
}

function NuevoCliente() {
    const navigate = useNavigate();
    const errores = useActionData(); // Sirve para acceder a los datos del action

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
            <p className='mt-3'>
                Llena todos los campos para registrar un nuevo cliente
            </p>

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
                    <Formulario />

                    <input
                        className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg rounded-md'
                        type='submit'
                        value='Registrar Cliente'
                    />
                </Form>
            </div>
        </>
    );
}

export default NuevoCliente;
