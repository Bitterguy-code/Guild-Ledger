import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/Homepage";
import About from './pages/About';
import Key from './pages/APIKey';
import CharacterManagement from './pages/CharacterManagement';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Watchlist from "./pages/Watchlist";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/key',
                element: <Key />
            },
            {
                path: '/characters',
                element: <CharacterManagement />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/watchlist',
                element: <Watchlist />
            }
        ]

    }
]);

export default router;