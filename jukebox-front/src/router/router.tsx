import { createBrowserRouter } from "react-router-dom";
import { appStartupRedirection } from "./loaders/redirections";

import StartupLayout from "../components/Startup/Startup.layout";
import ErrorEl from "../components/Common/Errors/ErrorEl";
import AuthorizeApp from "../components/Startup/AuthorizeApp/AuthorizeApp";
import RegisterUser from "../components/Startup/RegisterUser/RegisterUser";
import Error404 from "../components/Common/Errors/Error404";
import App from "../components/App/App";
import { SocketIOProvider } from '../hooks/Socket.io';


export const AppRouter = createBrowserRouter([
    {
        element: <StartupLayout/>,
        children: [
            {
                path: "/",
                loader: ({ request }) => appStartupRedirection(request),
                errorElement: <ErrorEl/>
            },
            {
                path: "authorize",
                loader: ({ request }) => appStartupRedirection(request),
                element: <AuthorizeApp/>,
                errorElement: <ErrorEl/>,
            },
            {
                path: "register",
                loader: ({ request }) => appStartupRedirection(request),
                element: <RegisterUser/>,
                errorElement: <ErrorEl/>
            },
            {
                path: '*',
                element: <Error404/>,
            }
        ]
    },
    {
        path: "app",
        element: (
            <SocketIOProvider>
                <App/>
            </SocketIOProvider>
        ),
    }
]) 

