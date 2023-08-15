import React from "react";
import Home from "./pages/Home";
import ViewPlaylist from "./pages/ViewPlaylist";

import {createBrowserRouter, RouterProvider, Route} from "react-router-dom";

const router = createBrowserRouter ([
    {
        path:"/",
        element: <Home/>
    },
    {
        path:"/view",
        element: <ViewPlaylist/>
    }
]);

const App = () => {
    return <RouterProvider router={router}/>;
}
export default App;