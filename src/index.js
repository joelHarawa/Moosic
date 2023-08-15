import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import {AuthProvider} from "./myContext/myAuthContext";

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </React.StrictMode>,
document.getElementById("root")
);