import React, {createContext, useEffect, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const CLIENT_ID = "69df94900568478790af02c965324d0f";
    const REDIRECT_URI = "https://app.moosic.xyz/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    const SCOPES = ["playlist-modify-public", "playlist-modify-private", "playlist-read-private", "playlist-read-collaborative"];
    const SCOPES_URL = SCOPES.join("%20");

    const [token, setToken] = useState("");
    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        //if we don't have a token and the hash is set
        if (!token && hash) {
            token = hash.substring(1).split("&").find(element => element.startsWith("access_token")).split("=")[1];

            //store token in local storage
            window.location.hash = "";
            window.localStorage.setItem("token", token);
            setToken(token);
        }

    }, []);

    const login = () => {
        console.log("THIS IS RUNNING");
        const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL}&response_type=${RESPONSE_TYPE}`;
        window.location.replace(authUrl);
    }

    const logout = () => {
        setToken(null);
        window.localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}