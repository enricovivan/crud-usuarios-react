import { createBrowserRouter } from "react-router-dom";
import App from "../pages/App";
import CadastroUsuario from "../pages/CadastroUsuario";
import Usuarios from "../pages/Usuarios";
import EditarUsuario from "../pages/EditarUsuario";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/cadastroUsuario',
        element: <CadastroUsuario/>
    },
    {
        path: '/usuariosCadastrados',
        element: <Usuarios />,
    },
    {
        path: '/user/:userId',
        element: <EditarUsuario />
    }
])

export {router}