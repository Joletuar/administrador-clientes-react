function Clientes({ cliente }) {
    const { id, nombre, telefono, email, empresa } = cliente;
    return (
        <tr className='text-center shadow-sm'>
            <td className='p-6 space-y-2'>
                <p className='text-2xl text-gray-800'>{nombre}</p>
                <p className='font-bold'>{empresa}</p>
            </td>

            <td className='p-6'>
                <p className='text-gray-600 font-normal italic'>
                    <span className='text-gray-800 uppercase font-bold not-italic'>
                        Email:{' '}
                    </span>
                    {email}
                </p>
                <p className='text-gray-600 font-normal'>
                    <span className='text-gray-800 uppercase font-bold'>
                        Teléfono:{' '}
                    </span>
                    {telefono}
                </p>
            </td>

            <td className='p3 flex gap-5 justify-center'>
                <button
                    type='button'
                    className='text-blue-600 hover:text-blue-700 uppercase font-bold text-xs'
                >
                    Editar
                </button>
                <button
                    type='button'
                    className='text-red-600 hover:text-red-700 uppercase font-bold text-xs'
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
}

export default Clientes;
