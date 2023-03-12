import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import NuevoCliente, {
    action as nuevoClienteAction,
} from './pages/NuevoCliente';
import Index, { loader as clientesLoader } from './pages/Index';
import ErrorPage from './components/ErrorPage';
import EditarClientes, {
    loader as editarClienteLoader,
    action as editarClienteAction,
} from './pages/EditarClientes';
import { action as eliminarClienteAction } from './components/Cliente';

// Aqui comenzamos definiendo nuestras Urls
const router = createBrowserRouter([
    {
        path: '/', // Ruta principal
        element: <Layout />, // Puede ser un compoonente o código html que se mostrará en la ruta
        children: [
            // Todo lo que esté dentro de este children va a estar aplicado en el componente que se pasa como elemento
            {
                index: true, // Esto se va a cargar cuando se defina la página principal
                element: <Index />,
                loader: clientesLoader, // Le pasamos el loader. Esto es para cargar datos
                errorElement: <ErrorPage />, // Aqui retornamos lo que queremos que se muestre cuando existe un error
            },
            {
                path: '/clientes/nuevo',
                element: <NuevoCliente />,
                action: nuevoClienteAction, // Le pasamos el action. Esto es para procesar un formulario
                errorElement: <ErrorPage />,
            },
            {
                // Routing dinámico
                path: '/clientes/:clienteId/editar',
                element: <EditarClientes />,
                loader: editarClienteLoader,
                errorElement: <ErrorPage />,
                action: editarClienteAction,
            },
            {
                path: '/clientes/:clienteId/eliminar',
                action: eliminarClienteAction,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
